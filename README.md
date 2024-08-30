# Gerenciador de Veículos
Gerenciador de veículos que utiliza Angular para o frontend e Node.js para o backend. A aplicação permite que os usuários realizem operações de CRUD (Criar, Ler, Atualizar e Deletar) em uma lista de veículos, comunicando-se com uma API RESTful para persistência de dados.
Este projeto é um sistema de Gerenciamento de Veículos desenvolvido com foco em manter um código limpo, organizado e robusto, utilizando algumas praticas de desenvolvimento listadas abaixo.


### 1. Tratamento de Erros

- **Manejo de Erros HTTP**: O projeto inclui um tratamento abrangente de erros HTTP utilizando o operador `catchError` do RxJS, garantindo que quaisquer falhas de comunicação com o servidor sejam devidamente capturadas e tratadas.
- **Mensagens de Erro para o Usuário**: Mensagens de erro amigáveis são exibidas na interface do usuário para notificar sobre problemas, como falhas em operações de adicionar, editar ou excluir veículos. Isso melhora a experiência do usuário, fornecendo feedback imediato e claro.
- **Registro de Erros para Depuração**: Erros são registrados no console para facilitar a depuração e identificação de problemas durante o desenvolvimento.

### 2. Codificação Limpa (Código Limpo)

- **Uso de Tipos e Interfaces**: Tipos TypeScript são usados extensivamente para garantir a tipagem forte e ajudar a evitar erros de tipo durante a compilação. Interfaces são definidas para representar a estrutura dos objetos de dados, como o modelo de veículo.
- **Métodos Modularizados**: Funções são modularizadas em métodos pequenos e reutilizáveis, seguindo o princípio de responsabilidade única (SRP), tornando o código mais fácil de manter e entender.
- **Documentação e Comentários**: Comentários são adicionados ao código para explicar a funcionalidade dos métodos e variáveis, facilitando a leitura e compreensão do código por outros desenvolvedores.
- **Práticas de Nomenclatura Consistentes**: Nomes descritivos e consistentes são usados para variáveis, métodos e componentes, seguindo as convenções de nomenclatura do TypeScript e Angular.
- **Uso de Modificadores de Acesso**: O código utiliza modificadores de acesso (`public` e `private`) para encapsular a lógica e proteger os dados, promovendo boas práticas de encapsulamento e segurança.

### 3. Arquitetura e Organização do Código

- **Separação de Preocupações**: O código está organizado de forma que a lógica de negócios, a interface do usuário e as interações de dados sejam separadas. Isso melhora a modularidade e facilita a escalabilidade do projeto.
- **Componentes Independentes**: Componentes Angular são projetados para serem independentes e reutilizáveis, promovendo a manutenibilidade e reutilização de código.
- **Uso de Servicos Angular**: Serviços são utilizados para lidar com operações de dados e lógica de negócios, separando estas responsabilidades dos componentes de UI, alinhando-se com as boas práticas de desenvolvimento Angular.

## Funcionalidades
Listar Veículos: Exibe uma lista de veículos com detalhes como ID, placa, chassi, renavam, modelo, marca e ano.

Busca de Veículos: Permite fazer a busca pela placa e chassi do veículo.

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

### Organização dos arquivos
``` plaintext
VEHICLE-CRUD/
│
├── backend/
│   ├── node_modules/
│   ├── test/
│   │   └── vehicles.test.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── vehicles.json
│
├── frontend/
│   ├── .angular/
│   ├── .vscode/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/
│   │       └── background/
│   │           └── background.webp  (Imagem de fundo)
│   ├── src/
│   │   ├── app/
│   │   │   ├── vehicle-list/
│   │   │   │   ├── vehicle-list.component.css
│   │   │   │   ├── vehicle-list.component.html
│   │   │   │   ├── vehicle-list.component.spec.ts
│   │   │   │   └── vehicle-list.component.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── vehicle.service.spec.ts
│   │   │   └── vehicle.service.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
│
└── README.md
```

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

[x] Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano). Obs.: Os dados podem ser salvos em arquivos

[x] Criar teste unitários utilizando Mocha (Node) para cada uma das operações (create, read, update, delete)

[x] Criar recursos rest para acesso aos dados dos veículos

[x] Criar projeto front-end utilizando a tecnologia Angular 5+ (Opcional)

[x] Criar lista de veiculos. Obs.: os dados deverão ser recuperados dos recursos rest definidos na aplicação backend (Opcional)

[x] Disponibilizar projeto no github
