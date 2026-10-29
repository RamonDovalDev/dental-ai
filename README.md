# Dental-AI

Dental-AI is an application for dental patients and clinics. Users can sign up, browse dental professionals, book appointments, and track them from a dashboard that keeps a history of their activity in the app.

The application also includes an AI voice agent that provides dental information and advice. Access and usage limits depend on the user's subscription. When an appointment is booked, a confirmation email with its details is sent automatically.

> Information provided by the AI agent is for general guidance and does not replace a diagnosis or care from a dental professional.

## Features

- User registration and sign-in.
- Personal dashboard with activity and appointment history.
- Browse and view dental professionals.
- Book and track appointments.
- Appointment confirmation emails.
- AI voice assistant for dental questions and information.
- Features and usage limits tied to the user's subscription.
- Protected administration area for managing the application.

## Technology stack

- **Next.js 16** and **React 19**.
- **Tailwind CSS** and **shadcn/ui** components.
- **Neon PostgreSQL** with **Prisma ORM 7**.
- **Clerk** for authentication and subscription management.
- **Vapi** for the AI voice agent.
- **Resend** for sending emails.

## Requirements

- Node.js compatible with Next.js 16.
- npm.
- A PostgreSQL database (for example, Neon).
- Accounts and credentials for Clerk, Vapi, and Resend.

## Local setup

1. Clone the repository and open the project directory.

   ```bash
   git clone <REPOSITORY_URL>
   cd dental-ai
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the required variables (see below).

4. Generate the Prisma client.

   ```bash
   npx prisma generate
   ```

5. Start the development server.

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Add your own service credentials to `.env`. Do not commit this file to the repository or share secret keys.

```dotenv
# PostgreSQL / Neon
DATABASE_URL=""

# Clerk project keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# Email address for the single administrator account
ADMIN_EMAIL=""

# Vapi
NEXT_PUBLIC_VAPI_API_KEY=""
NEXT_PUBLIC_VAPI_ASSISTANT_ID=""

# Resend
RESEND_API_KEY=""

# Public application URL, used in email links
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

You must also configure Clerk's redirect URLs in the Clerk dashboard for each environment. Keep `ADMIN_EMAIL` as a private server-side variable; do not rename it to `NEXT_PUBLIC_ADMIN_EMAIL`.

## Database

The Prisma schema is located at `prisma/schema.prisma` and defines users, doctors, and appointments. Set `DATABASE_URL` to your PostgreSQL/Neon connection string before using the application.

To review the Prisma schema and the migration commands available in your environment, run:

```bash
npx prisma
```

Apply schema changes using a migration workflow appropriate for your database and environment. Do not use a production database for local testing.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Next.js in development mode. |
| `npm run build` | Creates a production build. |
| `npm start` | Serves the production build. |
| `npm run lint` | Runs ESLint. |

## Project structure

```text
app/           Next.js routes and pages
components/    UI and feature components
lib/           Prisma access, actions, and services
prisma/        Database schema
public/        Static assets
```

## Privacy and security

- Do not publish secrets for Clerk, Resend, the database, or other services.
- The administration page validates the email configured in `ADMIN_EMAIL` on the server. Hiding the administration link in the UI is only a navigation convenience; the server-side check protects access.
- The AI assistant provides general guidance and does not replace a dental professional.
