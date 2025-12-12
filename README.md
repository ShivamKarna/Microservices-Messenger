# Microservices Messenger

A chat application backend built with microservices architecture. The system uses a monorepo structure with TypeScript, Express.js, and MySQL.

## Architecture

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

### Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm build` - Build all services
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Check code formatting with Prettier

## Author

**Shivam Karna**

- GitHub: [@ShivamKarna](https://github.com/ShivamKarna)

## License

ISC License
