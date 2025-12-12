# Microservices Messenger

Microservices-based chat application Backend with 4 independent services: API Gateway for request routing, Auth Service handling JWT authentication (MySQL), User Service managing profiles (PostgreSQL), and Chat Service powering real-time conversations (MongoDB + Redis caching). Polyglot persistence for optimized data handling.

## Architecture

The project follows a microservices pattern with shared common packages and independent services.

![System Architecture](./public/images/MicroMessenger.png)

### Structure

```
microServices/
├── packages/
│   └── common/              # Shared utilities
│       ├── logger.ts        # Pino-based logging
│       ├── env.ts           # Environment validation (Zod)
│       ├── errors/          # HTTP error classes
│       └── http/            # Request validation
│
└── services/
    └── auth-service/        # Authentication service
        ├── config/          # Environment configuration
        ├── db/              # Sequelize ORM setup
        ├── middleware/      # Error handling
        ├── routes/          # API endpoints
        └── utils/           # Service utilities
```

### Request Flow

```
Client Request
    │
    ├── Security Headers (Helmet)
    ├── Cross-Origin Control (CORS)
    ├── Body Parsing (JSON)
    ├── Route Handler
    └── Error Handler
    │
Response
```

## Services

### Auth Service

Handles user authentication and registration.

- Port: 6000
- Database: MySQL 8.0
- ORM: Sequelize
- Security: Helmet, CORS
- Error handling: Centralized middleware

## Tech Stack

- Runtime: Node.js + TypeScript
- Framework: Express.js v5.2.1
- Database: MySQL 8.0 (Docker)
- ORM: Sequelize v6.37.7
- Validation: Zod
- Logging: Pino
- Package Manager: pnpm (workspaces)
- Development: tsx, ESLint, Prettier

## 🛠️ Tech Stack

### Core Technologies

- **Runtime**: Node.js (with TypeScript)
- **Web Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Package Manager**: pnpm (with workspaces)
- **Containerization**: Docker & Docker Compose

### Libraries & Tools

- **Validation**: Zod
- **Logging**: Pino
- **Security**: Helmet, CORS
- **Development**: tsx (TypeScript execution), ESLint, Prettier
- **Database Driver**: mysql2

### Architecture Patterns

- Microservices architecture
- Monorepo structure (pnpm workspaces)
- Shared common package for code reusability
- Environment-based configuration
- Containerized deployment

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                  (Web/Mobile Applications)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/WS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     API GATEWAY (Future)                        │
│                   Request Routing & Load Balancing              │
└─────────────┬──────────────────────────────┬────────────────────┘
              │                              │
              │                              │
    ┌─────────▼─────────┐        ┌──────────▼──────────┐
    │                   │        │                     │
    │  AUTH SERVICE     │        │   CHAT SERVICE      │
    │   (Port: 6000)    │        │  (In Progress)      │
    │                   │        │                     │
    │  - Registration   │        │  - Real-time msgs   │
    │  - Login          │        │  - WebSockets       │
    │  - JWT Auth       │        │  - Presence         │
    │  - User Mgmt      │        │  - Room Mgmt        │
    │                   │        │                     │
    └─────────┬─────────┘        └──────────┬──────────┘
              │                              │
              │                              │
    ┌─────────▼─────────┐        ┌──────────▼──────────┐
    │                   │        │                     │
    │   MySQL DB        │        │   PostgreSQL DB     │
    │  (Auth Data)      │        │   (Chat Data)       │
    │  Port: 3306       │        │   (Future)          │
    │                   │        │                     │
    └───────────────────┘        └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     SHARED COMPONENTS                           │
│                                                                 │
│  @chatapp/common Package:                                       │
│    • Logger (Pino)                                             │
│    • Environment Validation (Zod)                              │
│    • HTTP Error Classes                                        │
│    • Request Validators                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                          │
│                                                                 │
│  • Docker Containers (Service Isolation)                       │
│  • Docker Compose (Orchestration)                              │
│  • Docker Network (Inter-service Communication)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

FUTURE ADDITIONS:
  • Message Queue (RabbitMQ/Kafka)
  • Redis Cache
  • Notification Service
  • Media Service
  • Monitoring Stack (Prometheus + Grafana)
```

## 📁 Project Structure

```
microServices/
├── packages/
│   └── common/                  # Shared utilities and types
│       ├── src/
│       │   ├── env.ts          # Environment validation
│       │   ├── logger.ts       # Logging utilities
│       │   ├── errors/         # Custom error classes
│       │   └── http/           # HTTP validators
│       └── package.json
│
├── services/
│   └── auth-service/           # Authentication microservice
│       ├── src/
│       │   ├── app.ts          # Express app setup
│       │   ├── index.ts        # Service entry point
│       │   ├── config/         # Configuration
│       │   ├── db/             # Database connection
│       │   ├── middleware/     # Custom middleware
│       │   ├── routes/         # API routes
│       │   └── utils/          # Service utilities
│       └── package.json
│
├── docker-compose.yml          # Service orchestration
├── pnpm-workspace.yaml         # Monorepo configuration
├── tsconfig.base.json          # Shared TypeScript config
└── package.json                # Root package config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.22.0 or higher)
- Docker & Docker Compose
- MySQL 8.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ShivamKarna/Microservices-Messenger.git
   cd Microservices-Messenger
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in the root directory
   cp .env.example .env

   # Configure the following variables:
   AUTH_SERVICE_PORT=6000
   AUTH_DB_NAME=chatapp_auth_service
   AUTH_DB_USER=chatapp_auth_user
   AUTH_DB_PASSWORD=chatapp_auth_password
   AUTH_DB_ROOT_PASSWORD=root_password
   AUTH_DB_PORT=3306
   ```

4. **Start services with Docker**

   ```bash
   docker-compose up -d
   ```

5. **Run in development mode**

   ```bash
   # Run all services
   pnpm dev

   # Or run specific service
   cd services/auth-service
   pnpm dev
   ```

6. **Build for production**
   ```bash
   pnpm build
   ```

### Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm build` - Build all services
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Check code formatting with Prettier
- `pnpm test` - Run tests (when implemented)

## 🔗 API Endpoints

### Auth Service (Port: 6000)

Coming soon - endpoints are being finalized:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/refresh` - Refresh access token

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific service
cd services/auth-service
pnpm test
```

## 📈 Performance & Scalability

- **Horizontal Scaling**: Each service can be scaled independently
- **Database Optimization**: Proper indexing and query optimization
- **Caching Strategy**: Redis integration planned for frequently accessed data
- **Load Balancing**: API Gateway with load balancing (roadmap)

## 🤝 Contributing

Contributions are welcome! This is a learning project, and I'm open to suggestions and improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Shivam Karna**

- GitHub: [@ShivamKarna](https://github.com/ShivamKarna)

## 🙏 Acknowledgments

- Inspired by industry-standard microservices patterns
- Built as a learning project to understand distributed systems

---

## 📣 LinkedIn Post

### Building a Microservices-Based Messenger App 🚀

I'm excited to share my latest project: a real-time messaging platform built with microservices architecture!

**What's Done:**
✅ Auth Service with JWT authentication
✅ MySQL integration with Sequelize ORM
✅ Shared common package for reusable utilities
✅ Docker containerization & monorepo setup (pnpm workspaces)

**Currently Working On:**
🔨 Chat Service with WebSocket-based real-time messaging
🔨 Message persistence and user presence tracking

**Tech Stack:** Node.js, TypeScript, Express, MySQL, Docker, Sequelize

**Key Learnings:**
• Designing loosely coupled, independently deployable services
• Managing shared code in a monorepo structure
• Implementing secure authentication patterns
• Container orchestration with Docker Compose

**Next Steps:**
Building API Gateway, notification service, and exploring message queues (RabbitMQ/Kafka) for async communication.

**Looking for feedback!** Any tips on microservices best practices or scaling strategies? Drop a comment or DM—I'd love to connect and learn from your experience!

#Microservices #NodeJS #SoftwareEngineering #BackendDevelopment #Docker #TypeScript #LearningInPublic #SoftwareDevelopment

---

_⭐ If you find this project interesting, please give it a star on GitHub!_
