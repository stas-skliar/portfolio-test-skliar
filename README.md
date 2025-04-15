## 🚀 How to Run the Project Locally

### ⚙️ 1. Create a `.env` File

Create a `.env` file in the project root with the following environment variables:
https://drive.google.com/file/d/1nl4UAKzih4tcCGV-eP7c0fZPjr5DtjMt/view?usp=sharing
Obviously, this is not safe, but it will do for the test task 🙂
---

### 🐳 2. Start PostgreSQL + pgAdmin with Docker

> The `docker-compose.yml` file is already preconfigured.

#### 📂 Docker Setup Includes:

- PostgreSQL (port: `5432`)
- pgAdmin (port: `5050`)

#### ▶️ Run Docker:

```bash
docker-compose up -d
```

#### 🛠️ pgAdmin Access:

- URL: http://localhost:5050
- Email: `env.PGADMIN_DEFAULT_EMAIL`
- Password: `env.PGADMIN_DEFAULT_PASSWORD`

> Add a new server in pgAdmin using:
> - Host: `postgres`
> - Username: `env.DB_USER`
> - Password: `env.DB_PASS`
> - DB_NAME: `env.DB_NAME`

---

### 📥 3. Install Dependencies

```bash
yarn install
```

> or

```bash
npm install
```

---

### 🧬 4. Run Migrations

Before running the app, apply the database migrations:

```bash
yarn migrate
```

> or

```bash
npm run migrate
```

This will run the script defined in your `package.json`:

```json
"scripts": {
  "migrate": "sequelize-cli db:migrate --config config/config.cjs"
}
```

---

### ▶️ 5. Start the NestJS Server

```bash
yarn start:dev
```

> The server will run at: [http://localhost:3000](http://localhost:3000)

---

### 📚 6. Swagger API Documentation

Once the server is running, open:  
🔗 [http://localhost:3000/api](http://localhost:3000/api)

---
