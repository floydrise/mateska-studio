# Mateska Studio

**A full-stack fitness training platform for delivering and selling online workout programmes.**

[![Live Website](https://img.shields.io/badge/Website-studio.mateskasport.com-0ea5e9?style=flat&logo=googlechrome&logoColor=white)](https://studio.mateskasport.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Runtime-Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)

Mateska Studio is a client project developed for Mateska Sport, designed to provide an online platform for selling and delivering structured fitness programmes.

The platform combines a public-facing website, user authentication, subscription-based payments, and an administrative interface for managing workout programmes and their content.

**Project status:** Development is currently on hold while the client plans a broader expansion of the platform. The existing implementation represents the initial version and its original scope.

**Live application:** [studio.mateskasport.com](https://studio.mateskasport.com) - currently under maintenance

## Features

### User experience
- Responsive landing page showcasing available workout programmes.
- Dynamic workout programme listings retrieved from the database.
- Structured workout content organised into programmes, sections, and individual sessions.
- Embedded Vimeo videos for delivering workout sessions.
- Light and dark themes.
- Testimonials, FAQs, and instructional content.

### Authentication and user management
- Email and password authentication.
- Passwordless authentication through magic links.
- Google and Facebook OAuth integration.
- Email verification and password reset functionality.
- Account deletion with associated Stripe customer data handling.
- Role-based access control.
- Administrative user management, including account moderation.

### Payments and subscriptions
- Stripe integration through Better Auth.
- Subscription-based access to workout programmes.
- Automatic Stripe customer creation.
- Dynamic subscription plans retrieved from the database.
- Subscription management and webhook integration.

### Administrative dashboard
- Create workout programmes and their associated product cards.
- Organise programmes into sections and individual workout sessions.
- Edit existing workout cards, sections, and sessions.
- Manage registered users.
- Control access to administrative functionality through role-based authorisation.

## Tech Stack

The project uses a TypeScript-based monorepo architecture, with a React frontend and a Hono backend.

| Category | Technologies |
|---|---|
| Language | TypeScript |
| Runtime | Bun |
| Frontend | React 19, Vite |
| Routing | TanStack Router |
| Data fetching | TanStack Query |
| Forms | TanStack Form |
| Backend | Hono |
| Authentication | Better Auth |
| Payments | Stripe, Better Auth Stripe plugin |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod |
| Styling | Tailwind CSS, Radix UI, shadcn/ui |
| Email | Resend, React Email |
| Video delivery | Vimeo |
| Animation | Motion, GSAP |

## Architecture

The repository is organised into separate application and shared-code directories:

```text
mateska-studio/
├── emails/                 # Transactional email templates
├── server/
│   ├── db/
│   │   └── schema/         # Database schemas
│   ├── middleware/         # Authentication middleware
│   ├── routes/             # API endpoints
│   └── schemas/            # Request validation schemas
├── shared/                 # Shared application types and schemas
├── view/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── lib/            # API clients and utilities
│       └── routes/         # File-based application routes
├── auth.ts                 # Better Auth configuration
├── drizzle.config.ts       # Drizzle Kit configuration
├── package.json
└── bun.lock
```

### Backend

The backend is built with Hono and runs on Bun.

It exposes REST API endpoints for workout programme management, authentication-related operations, email delivery, and Stripe customer data handling.

Database operations are handled through Drizzle ORM, using PostgreSQL as the primary data store.

### Frontend

The frontend is a React single-page application built with Vite.

TanStack Router handles file-based routing, while TanStack Query manages asynchronous server state and API communication.

The application also uses TanStack Form for form management and Zod for validation.

### Authentication and payments

Better Auth provides the authentication infrastructure, including social login, magic links, account management, and administrative functionality.

Its Stripe integration handles customer creation and subscription management. Subscription plans are dynamically loaded from the workout programme data stored in PostgreSQL.

## Project Status

Mateska Studio was developed as an initial production-oriented implementation for a client.

Development is currently paused while the client evaluates and plans an expansion of the platform. The existing codebase provides the foundation for the original product scope, with further development expected to follow the client's updated requirements.

The repository remains available as a demonstration of the architecture, technologies, and full-stack development involved in building the platform.

## Author

**Stefan Petrov**

Full-stack developer

- [GitHub](https://github.com/floydrise)
- [LinkedIn](https://www.linkedin.com/in/stefan-petrov-6404401bb/)

---

*Developed for Mateska Sport.*