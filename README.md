# 🚀 AuthFlow

&#x20; &#x20;

A production-ready, plug-and-play authentication & authorization API built with **NestJS**, **PostgreSQL**, **Prisma**, and **PassportJS**. Designed to eliminate repetitive auth boilerplate in your projects.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Local Setup](#local-setup)
6. [Deploy on AWS EC2](#deploy-on-aws-ec2)
7. [API Endpoints](#api-endpoints)
8. [Future Improvements](#future-improvements)
9. [License](#license)

---

## 📝 Overview

**AuthFlow** simplifies secure user management by providing a reusable backend for authentication and authorization. Out of the box, it supports:

- JWT, Google, and GitHub login strategies
- Email verification and resending
- Password reset workflow
- Token refresh
- File uploads via AWS S3
- Background tasks with BullMQ (Redis)
- Rate limiting and session cleanup

---

## 🎯 Features

- 🔐 **Authentication**: JWT, Google OAuth2, GitHub OAuth2
- ✅ **Email Verification**: Automatic verification and resend links
- 🔁 **Token Refresh**: 1h access tokens, 7d refresh tokens
- 🔄 **Background Jobs**: Email sending with BullMQ
- 🗂 **File Uploads**: Multer + AWS S3 + CloudFront
- 🚨 **Rate Limiting**: Protect endpoints from abuse
- 🧑‍💻 **Admin Management**: CRUD operations on users
- 🕒 **Cron Jobs**: Cleanup expired sessions
- 📄 **API Docs**: Swagger UI at `/api`

---

## 🛠️ Tech Stack

| Layer        | Technology                       |
| ------------ | -------------------------------- |
| **Backend**  | NestJS                           |
| **Database** | PostgreSQL + Prisma ORM          |
| **Auth**     | PassportJS (JWT, Google, GitHub) |
| **Queue**    | BullMQ + Redis                   |
| **Storage**  | AWS S3, AWS CloudFront           |
| **Cron**     | node-cron                        |
| **Docs**     | Swagger                          |

---

## 🧰 Prerequisites

- **Node.js** >= 18.x
- **Docker** & **Docker Compose**
- **AWS S3 Bucket** & **CloudFront** (for file uploads)

---

## 🚀 Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/authflow.git
   cd authflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create \*\***`.env`\***\* file**

   Copy `.env.example` to `.env` and update values:

   ```env
   DATABASE_URL=postgresql://admin:consolelogadmin@localhost:5433/consolelog_db
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=consolelogredis
   JWT_SECRET=your_jwt_secret

   # OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   GITHUB_CLIENT_ID=your_github_id
   GITHUB_CLIENT_SECRET=your_github_secret

   # AWS
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   S3_BUCKET_NAME=your_bucket
   CLOUDFRONT_DOMAIN=your_distribution.cloudfront.net
   ```

4. **Start services**

   ```bash
   docker-compose up -d
   ```

5. **Generate Prisma client & run migrations**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. **Run the application**

   ```bash
   npm run start:dev
   ```

7. **Access Swagger UI**

   Visit `http://localhost:3000/api` in your browser.

---

## ☁️ Deploy on AWS EC2

1. **Provision EC2 Instance**
   - OS: Ubuntu 22.04+
   - Open ports: `22`, `3000`, `5433`, `6379`, `8001`

2. **SSH into Instance**

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Docker & Compose**

   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker
   ```

4. **Clone and Configure**

   ```bash
   git clone https://github.com/your-org/authflow.git
   cd authflow
   ```

   Create `.env` with production credentials.

5. **Use Docker Compose**

   ```yaml
   version: '3.8'

   services:
     postgres:
       image: postgres:latest
       container_name: authflow_db
       ports:
         - '5433:5432'
       environment:
         POSTGRES_USER: admin
         POSTGRES_PASSWORD: consolelogadmin
         POSTGRES_DB: consolelog_db
       volumes:
         - pgdata:/var/lib/postgresql/data
       restart: unless-stopped

     redis:
       image: redis:alpine
       container_name: authflow_redis
       ports:
         - '6379:6379'
       command: ['redis-server', '--requirepass', 'consolelogredis']
       environment:
         REDIS_PASSWORD: consolelogredis
       volumes:
         - redisdata:/data
       restart: unless-stopped

   volumes:
     pgdata:
     redisdata:
   ```

6. **Start Containers**

   ```bash
   docker-compose up -d
   ```

7. **Install & Build**

   ```bash
   npm install
   npm run build
   npm run start:prod
   ```

> **Tip:** Use PM2, Dockerfile, or systemd for process management.

---

## 🔄 API Endpoints

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| POST   | `/auth/register`        | User registration       |
| POST   | `/auth/login`           | Email/password login    |
| POST   | `/auth/google`          | Google OAuth login      |
| POST   | `/auth/github`          | GitHub OAuth login      |
| GET    | `/auth/verify/:token`   | Email verification      |
| POST   | `/auth/refresh-token`   | Refresh access token    |
| POST   | `/auth/forgot-password` | Initiate password reset |
| POST   | `/auth/reset-password`  | Complete password reset |

For complete details, see Swagger UI.

---

## 🚧 Future Improvements

- TOTP-based 2FA
- Session/device management dashboard
- Webhook/event subscription system
- MJML-powered email templates
- Publish as NPM & Docker image

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
