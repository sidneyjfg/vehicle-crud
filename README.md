# Gerenciador de Veículos
Este projeto é um sistema de Gerenciamento de Veículos desenvolvido utilizando Angular para o frontend e Node.js para o backend. A aplicação permite que os usuários realizem operações de CRUD (Criar, Ler, Atualizar e Deletar) em uma lista de veículos, comunicando-se com uma API RESTful para persistência de dados.

## Funcionalidades
Listar Veículos: Exibe uma lista de veículos com detalhes como ID, placa, chassi, renavam, modelo, marca e ano.
Adicionar Veículo: Permite a adição de um novo veículo à lista, fornecendo os detalhes necessários.
Atualizar Veículo: Permite a edição dos detalhes de um veículo existente na lista.
Deletar Veículo: Remove um veículo da lista de veículos.
Integração com Backend: Utiliza uma API RESTful construída em Node.js para comunicação com o servidor e persistência dos dados dos veículos.

### Tecnologias Utilizadas
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Como Executar o Projeto
### Clonar o Repositório:
git clone https://github.com/sidneyjfg/vehicle-crud.git

## Instalar as Dependências:
cd backend
* npm install

## Como rodar os testes unitários:
* npx mocha test/vehicles.test.js



## Iniciar o Servidor de Desenvolvimento (frontend):
cd ../frontend
* npm install
* ng serve

## Acessar a Aplicação Front End:
* Abra seu navegador e acesse http://localhost:4200/

### Funcionalidades
[x] Criar projeto backend utilizando (Node.Js)

[-] Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano). Obs.: Os dados podem ser salvos em arquivos

[x] Criar teste unitários utilizando Mocha (Node) para cada uma das operações (create, read, update, delete)

[x] Criar recursos rest para acesso aos dados dos veículos

[x] Criar projeto front-end utilizando a tecnologia Angular 5+ (Opcional)

[-] Criar lista de veiculos. Obs.: os dados deverão ser recuperados dos recursos rest definidos na aplicação backend (Opcional)

[x] Disponibilizar projeto no github
