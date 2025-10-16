##
## Build
##

FROM golang:1.24.7 AS build

WORKDIR /app

COPY go.mod .
# COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o /todo-list-backend

##
## Deploy
##

FROM gcr.io/distroless/base-debian12

WORKDIR /

COPY --from=build /todo-list-backend /todo-list-backend

EXPOSE 8090

USER nonroot:nonroot

ENTRYPOINT ["/todo-list-backend"]
