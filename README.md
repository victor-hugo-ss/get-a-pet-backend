# 🐾 Get a Pet — Backend

API REST para uma plataforma de adoção de animais. Permite que usuários cadastrem pets para adoção, gerenciem seus perfis e realizem solicitações de adoção com autenticação JWT.

---

## 🚀 Tecnologias

- **[Node.js](https://nodejs.org/)** — Runtime JavaScript (ES Modules)
- **[Express v5](https://expressjs.com/)** — Framework web
- **[MongoDB](https://www.mongodb.com/)** + **[Mongoose v9](https://mongoosejs.com/)** — Banco de dados e ODM
- **[JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)** — Autenticação via token
- **[Multer v2](https://github.com/expressjs/multer)** — Upload de imagens
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** — Hash de senhas
- **[cookie-parser](https://github.com/expressjs/cookie-parser)** — Parsing de cookies
- **[cors](https://github.com/expressjs/cors)** — Controle de origens permitidas
- **[dotenv](https://github.com/motdotla/dotenv)** — Variáveis de ambiente
- **[nodemon](https://nodemon.io/)** _(dev)_ — Reinício automático do servidor

---

## 📁 Estrutura do Projeto

```
└── 📁 get-a-pet-backend
    ├── 📁 public
    │   └── 📁 images
    │       ├── 📁 pets
    │       └── 📁 users
    ├── 📁 src
    │   ├── 📁 config
    │   │   └── 📄 db.js
    │   ├── 📁 controllers
    │   │   ├── 📄 petController.js
    │   │   └── 📄 userController.js
    │   ├── 📁 middlewares
    │   │   ├── 📄 checkToken.js
    │   │   ├── 📄 uploadImage.js
    │   │   └── 📄 verifyPetOwner.js
    │   ├── 📁 models
    │   │   ├── 📄 Pet.js
    │   │   └── 📄 User.js
    │   ├── 📁 routes
    │   │   ├── 📄 petRoutes.js
    │   │   └── 📄 userRoutes.js
    │   ├── 📁 utils
    │   │   ├── 📄 create-user-token.js
    │   │   ├── 📄 get-token.js
    │   │   └── 📄 get-user-by-token.js
    │   ├── 📄 app.js
    │   └── 📄 index.js
    ├── ⚙️ .env.example
    ├── ⚙️ .gitignore
    ├── ⚙️ .prettierrc
    ├── 📝 README.md
    ├── ⚙️ package-lock.json
    └── ⚙️ package.json
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) local ou uma instância no [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🛠️ Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/victor-hugo-ss/get-a-pet-backend.git
cd get-a-pet-backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor em desenvolvimento
npm run dev

# Ou em produção
npm start
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
PORT=5000
JWT_SECRET=sua_chave_secreta_aqui
MONGODB_URI=mongodb://localhost:27017/getapet
FRONTEND_URL=http://localhost:3000
```

---

## 📌 Endpoints da API

### 👤 Usuários — `/users`

| Método  | Rota               | Descrição                       | Auth | Upload              |
| ------- | ------------------ | ------------------------------- | ---- | ------------------- |
| `POST`  | `/users/register`  | Cadastra um novo usuário        | ❌   | ❌                  |
| `POST`  | `/users/login`     | Realiza login e retorna o token | ❌   | ❌                  |
| `GET`   | `/users/checkuser` | Verifica o usuário autenticado  | ✅   | ❌                  |
| `GET`   | `/users/:id`       | Busca um usuário pelo ID        | ❌   | ❌                  |
| `PATCH` | `/users/edit`      | Atualiza dados do usuário       | ✅   | 🖼️ `image` (single) |

### 🐶 Pets — `/pets`

| Método   | Rota                | Descrição                          | Auth  | Upload                  |
| -------- | ------------------- | ---------------------------------- | ----- | ----------------------- |
| `POST`   | `/pets/create`      | Cadastra um novo pet               | ✅    | 🖼️ `images` (múltiplas) |
| `GET`    | `/pets`             | Lista todos os pets disponíveis    | ❌    | ❌                      |
| `GET`    | `/pets/mypets`      | Lista os pets do usuário logado    | ✅    | ❌                      |
| `GET`    | `/pets/myadoptions` | Lista as adoções do usuário logado | ✅    | ❌                      |
| `GET`    | `/pets/:id`         | Busca um pet pelo ID               | ❌    | ❌                      |
| `DELETE` | `/pets/:id`         | Remove um pet                      | ✅ 🔒 | ❌                      |
| `PATCH`  | `/pets/:id`         | Atualiza dados de um pet           | ✅ 🔒 | 🖼️ `images` (múltiplas) |

> ✅ Requer token JWT no header: `Authorization: Bearer <token>`  
> 🔒 Requer que o usuário autenticado seja o dono do pet

---

## 🖼️ Upload de Imagens

As imagens são armazenadas localmente na pasta `public/images/`:

- **Pets:** `public/images/pets/`
- **Usuários:** `public/images/users/`

Formatos aceitos: `jpg`, `jpeg`, `png`.

---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha nova feature'`
4. Faça o push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito para conectar pets e pessoas</p>
