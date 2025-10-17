# todo-list

## Comandos do Docker

### Inicia o ambiente de desenvolvimento do frontend com hot reload
docker compose watch angular-dev

### Inicia o ambiente de desenvolvimento do backend
docker compose watch backend-dev

### Inicia o ambiente de desenvolvimento do frontend
docker compose watch angular-dev

### Inicia todos os serviços
docker compose up

### Inicia todos os serviços e libera o terminal
docker compose up -d

### Inicia um serviço
docker compose up serviço

### Inicia um grupo de serviços 
docker compose --profile front up

### Inicia um grupo de serviços em modo watch
docker compose --profile front watch

### Lista os grupos de serviços do docker compose
docker compose ls

### Finaliza um grupo de serviços pelo nome
docker compose -p todo-list down

### remove os containers
docker compose down

### Dicas
Se pedir senha quando for acessar o pgadmin tem que mudar as permissões do arquivo local:
chmod 600 pgpass

Quando estiver executando um --profile o comando --build pode ajudar caso não encontre a rede.
