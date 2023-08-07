FROM ubuntu:focal

ARG GITBRANCH=release-1.4.15

# DEBIAN_FRONTEND required for tzdata dependency install
RUN apt-get update \
      && DEBIAN_FRONTEND="noninteractive" \
      apt-get install -y sudo tzdata curl gnupg gcc git ca-certificates \
              protobuf-compiler libprotobuf-dev supervisor \
              pkg-config libssl-dev make build-essential gettext-base lsof \
      && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-c"] 

# install cmake
RUN curl -Ls https://github.com/Kitware/CMake/releases/download/v3.17.3/cmake-3.17.3-Linux-x86_64.tar.gz | sudo tar -C /usr/local --strip-components=1 -xz

# install rust nigthly and rustup
RUN curl -f -L https://static.rust-lang.org/rustup.sh -O \
    && sh rustup.sh -y 
ENV PATH="$PATH:/root/.cargo/bin"

# set few environment variables needed for the nctl build scripts
ENV NCTL="/root/casper-node/utils/nctl"
ENV NCTL_CASPER_HOME="/root/casper-node"
ENV NCTL_COMPILE_TARGET="release"

# clone the casper-node repos and build binaries
RUN git clone https://github.com/casper-network/casper-node-launcher.git ~/casper-node-launcher \
    && cd ~/casper-node-launcher && cargo build --release
RUN git clone -b main https://github.com/casper-ecosystem/casper-client-rs ~/casper-client-rs \
    && cd ~/casper-client-rs && cargo build --release
RUN git clone -b $GITBRANCH https://github.com/casper-network/casper-node.git ~/casper-node \
    && source ~/casper-node/utils/nctl/sh/assets/compile.sh 

# run clean-build-artifacts.sh to remove intermediate files and keep the image lighter
COPY ./clean-build-artifacts.sh .
RUN chmod +x clean-build-artifacts.sh
RUN ./clean-build-artifacts.sh


## Second stage. Leave behind build tools and:
## (1) reinstall needed dependencies to run NCTL nodes.
## (2) copy binaries built in first stage.
## (3) add scripts and predefined accounts.
##
FROM ubuntu:focal

RUN apt-get update \
      && apt-get install -y sudo curl git ca-certificates jq supervisor lsof python3-pip \
      && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash casper && echo "casper:casper" | chpasswd && adduser casper sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER casper

SHELL ["/bin/bash", "-c"]

WORKDIR /home/casper

RUN python3 -m pip install toml

COPY --from=0 --chown=casper:casper /root/casper-node-launcher ./casper-node-launcher
COPY --from=0 --chown=casper:casper /root/casper-client-rs ./casper-client-rs
COPY --from=0 --chown=casper:casper /root/casper-node ./casper-node

ENV NCTL="/home/casper/casper-node/utils/nctl"
ENV NCTL_CASPER_HOME="/home/casper/casper-node"
ENV NCTL_CASPER_NODE_LAUNCHER_HOME="/home/casper/casper-node-launcher"
ENV NCTL_CASPER_CLIENT_HOME="/home/casper/casper-client-rs"
RUN echo "source casper-node/utils/nctl/activate" >> .bashrc
RUN echo "alias casper-client=/home/casper/casper-client-rs/target/release/casper-client" >> .bashrc

COPY --chown=casper:casper ./restart.sh .
COPY --chown=casper:casper ./net-1-predefined-accounts.tar.gz .

EXPOSE 11101-11105 14101-14105 18101-18105

HEALTHCHECK CMD casper-client get-block --node-address http://localhost:11101/rpc | jq 'has("result")'

CMD ["/bin/bash", "-c", "source /home/casper/restart.sh"]
