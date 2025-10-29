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


## Comandos do kompose

### Converte um profile do docker compose para kubernetes
kompose convert --profile prod

### Faz o deploy do profile prod no kubernetes
kubectl apply -f angular-deployment.yaml,angular-service.yaml,backend-deployment.yaml,backend-service.yaml,postgres-deployment.yaml,postgres-service.yaml,todo-list-data-prod-persistentvolumeclaim.yaml

### Apaga o deploy
kubectl delete -f angular-deployment.yaml,angular-service.yaml,backend-deployment.yaml,backend-service.yaml,postgres-deployment.yaml,postgres-service.yaml,todo-list-data-prod-persistentvolumeclaim.yaml
