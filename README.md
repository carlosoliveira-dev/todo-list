# todo-list

## Comandos do Docker

### Inicia a aplicação em modo desenvolvedor
docker compose --profile dev watch

### Inicia a aplicação em modo de produção
docker compose --profile prod up

### Faz o build dos serviços de um profile
docker compose --profile prod build

### Lista os grupos de serviços do docker compose
docker compose ls

### Finaliza um grupo de serviços pelo nome
docker compose -p todo-list down
