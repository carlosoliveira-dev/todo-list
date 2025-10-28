FROM golang:1.25.2-alpine AS development
WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.* ./
RUN go mod download

COPY . .

EXPOSE 8090

CMD [ "air", "-c", ".air.toml" ]


FROM golang:1.25.2 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /todo-list


FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /todo-list /todo-list

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/todo-list"]