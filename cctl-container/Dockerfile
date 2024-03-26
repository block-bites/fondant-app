FROM --platform=linux/amd64 rust:buster as builder

WORKDIR /usr/src/myapp

COPY api/Cargo.toml ./

RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

COPY api/src ./src

RUN cargo build --release

FROM commondrum/cctl-fondant:latest

USER root

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/myapp/target/release/api ./
COPY api/src/commands.json ./

RUN chmod -R +x /home/cctl

ENTRYPOINT ["./api"]

EXPOSE 3001 80 18101

CMD ["tail", "-f", "/dev/null"]