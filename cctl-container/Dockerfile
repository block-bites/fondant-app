FROM --platform=linux/amd64 rust:buster as builder

WORKDIR /usr/src/myapp

COPY api/src ./src
COPY api/Cargo.toml ./

RUN cargo build --release || { echo "Compilation failed"; exit 1; }

FROM commondrum/cctl-fondant:latest

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/myapp/target/release/api ./
COPY api/src/utils/commands.json ./

RUN sudo chmod +x /home/cctl/*

ENTRYPOINT ["./api"]

EXPOSE 3001

CMD ["tail", "-f", "/dev/null"]