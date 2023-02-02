####################################################################################################
## Builder
####################################################################################################
FROM rust:latest AS builder

WORKDIR /myip

COPY ./ .
WORKDIR /myip/packages/arex-rs
RUN ls
RUN cargo install wasm-pack
RUN wasm-pack build


FROM node:16.14.0-alpine

MAINTAINER wr_zhang25

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app

# Copy our build
COPY --from=builder /myip/packages/arex-rs/pkg /usr/src/app/packages/arex-rs-pkg
RUN ls
RUN node -v
RUN npm install pnpm -g
RUN pnpm install
RUN pnpm run build

EXPOSE 8080
CMD ["pnpm", "run","server" ]
