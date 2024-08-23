# node-api-iHeros

## 🧰 Pré-requisitos
Antes de começar, verifique se você atendeu aos seguintes requisitos:
* docker
* docker-compose

### 💻 Como executar
Baixar repositório
```sh
git clone https://github.com/KelvinSeverino/node-api-iheros.git
```

Acessar diretório do projeto
```sh
cd node-api-iheros
```

Acessar diretório do projeto
```sh
cd ./app
```

Crie o arquivo .env
```sh
cp .env.example .env
```

Atualize as variáveis de ambiente do arquivo .env
```sh
APP_LOCAL_PORT = 3001
APP_DOCKER_PORT = 3001

DB_NAME = iheros
DB_HOST = localhost
DB_LOCAL_PORT = 3306
DB_DOCKER_PORT = 3306
DB_USER = iheros
DB_PASSWORD = 1234

JWT_SECRET = 8d4b2b3846a4b908fd6bbc78aee473cb7c43486b97fe4fdb46825ecd53e50fcc

```

Voltar a raiz do projeto
```sh
cd ../
```

Criar link simbólico para o Docker ter acesso as variaveis de ambiente
```sh
ln -s ./app/.env .env
```

Iniciar os containers
```sh
docker-compose up -d
```

## 💻 Arquivos Auxiliares
Caso precise, disponibilizei um arquivo de consumo da API com POSTMAN para entendimento deste projeto, que está na raiz deste projeto:
* API-IHeros.postman_collection.json

Feito os processo acima, você poderá acessar a API pelo link em [http://localhost:3001](http://localhost:3001) e consumir as rotas disponibilizadas no arquivo mencionado no inicio deste README.

## 🧪 Testes
Para garantir que a aplicação esteja funcionando corretamente e que as alterações não quebrem a funcionalidade existente, execute os testes automatizados seguindo estas etapas:

### Pré-requisitos
Antes de executar os testes, verifique se você possui os seguintes requisitos instalados:
* Node.js
* Jest

### Passos para Executar os Testes
Instalar Dependências

Certifique-se de que todas as dependências do projeto estejam instaladas. Na raiz do projeto, execute:
```sh
npm install
```

Para rodar os testes, utilize o seguinte comando:
```sh
npm test
```