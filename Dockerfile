FROM golang:1.20 as builder
RUN mkdir /build
ADD . /build/
WORKDIR /build
RUN CGO_ENABLED=0 GOOS=linux make build


FROM alpine:3
ARG VERSION
COPY --from=builder /build/dist/ecab-${VERSION}-linux-amd64 ecab
RUN addgroup -S exporter && adduser -S exporter -G exporter
USER exporter
ENTRYPOINT [ "./ecab" ]