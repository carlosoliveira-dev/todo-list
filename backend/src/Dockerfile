FROM golang:1.25.2-alpine
WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.* ./
RUN go mod download

COPY . .

EXPOSE 8090

CMD [ "air", "-c", ".air.toml" ]
