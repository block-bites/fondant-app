FROM rust:buster as builder

WORKDIR /usr/src/myapp

COPY /api/src ./src
COPY api/Cargo.toml  ./

RUN cargo build --release

FROM commondrum/cctl-container:latest

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/myapp/target/release/api ./


ENTRYPOINT ["./api"]

EXPOSE 8080
