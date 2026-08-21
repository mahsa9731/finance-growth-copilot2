# Smart Merchant Intelligence Platform

A comprehensive, production-grade analytics and management system tailored for modern merchants. This platform processes complex transaction datasets to deliver real-time financial metrics, automated actionable insights, customer loyalty tracking, and gateway stability routing.

---

## Architecture & Project Structure

The project follows the Next.js App Router architecture, ensuring clean separation of concerns between backend analytics computation, routing, and client-side presentation layers.

```text
src/
├── app/                  # Next.js App Router pages and API endpoints
│   ├── api/              # Backend analytics and notification endpoints
│   └── dashboard/        # Dashboard layout, growth, customers, and traceability views
├── components/           # Reusable UI components (Layout, Charts, Cards, Modals)
├── services/             # Core analytics engine and data processing logic
└── types/                # TypeScript interface definitions (Transactions, Metrics, Insights)


##Core Modules

Analytics Engine (analyticsEngine.ts): Processes raw transaction datasets to compute key performance indicators, hourly distributions, bank breakdowns, and actionable financial insights.

Dashboard Layout (DashboardLayout.tsx): Implements a responsive glassmorphic workspace featuring a collapsible sidebar, dynamic header search, user profile integration, and Framer Motion animations.

Growth & Sales Analysis (/dashboard/growth): Visualizes transaction volume trends, conversion rates, and revenue metrics alongside prioritized recommendations.

Customer Management (/dashboard/customers): Automatically extracts and aggregates buyer behavior based on transaction history, providing direct engagement capabilities.

Gateway Stability (/dashboard/gateways): Monitors payment gateway performance, error codes, and failover states to minimize transaction drop-offs.

Traceability & Guide (/dashboard/traceability): Documents computation methodologies, data security practices, and system guidelines.

## Tech Stack

Core: TypeScript, React, Next.js (App Router)(Full-Stack)

Styling: Tailwind CSS, Glassmorphism

Animations: Framer Motion

Icons: Lucide React


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
