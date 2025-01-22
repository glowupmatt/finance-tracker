# Finance Tracker App

A modern and efficient finance tracking app that helps you manage your expenses, income, and budget all in one place. Built with Next.js, Tailwind CSS, Prisma, PostgreSQL, and ShadCN, this app provides a clean, intuitive interface for keeping your financial records in check.

## Features

- **Expense Tracking**: Easily log and categorize your daily expenses.
- **Income Tracking**: Track your earnings by user input.
- **Budget Management**: Set and monitor budgets for different categories.
- **Analytics**: Visualize your patterns by adding transactions in pots.
- **User Authentication**: Secure sign-up and login with authentication.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React framework for SSR and static site generation)
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework for rapid UI development)
  - [ShadCN](https://github.com/shadcn-ui/shadcn) (UI components library for building modern interfaces)

- **Backend**:
  - [Prisma](https://www.prisma.io/) (Next-generation ORM for Node.js and TypeScript)
  - [PostgreSQL](https://www.postgresql.org/) (Relational database management system)

- **Authentication**: 
  - [NextAuth.js](https://next-auth.js.org/) (Authentication for Next.js applications)

## Setup

### Prerequisites

Before starting, make sure you have the following installed:

- Node.js (>= 14.x)
- PostgreSQL (running locally or on a cloud provider)
- Yarn (optional, but recommended)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/glowupmatt/finance-tracker.git
    cd finance-tracker
    ```

2. **Install dependencies**:

    If you're using Yarn:

    ```bash
    yarn install
    ```

    Or if you're using npm:

    ```bash
    npm install
    ```

3. **Set up the PostgreSQL database**:

    - Create a `.env` file in the root of the project and add your database URL:

    ```bash
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/finance_tracker?schema=public"
    ```

    Replace `USER`, `PASSWORD`, and `localhost` with your PostgreSQL credentials.

4. **Run database migrations**:

    Use Prisma to set up the database schema:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the development server**:

    ```bash
    yarn dev
    ```

    Or with npm:

    ```bash
    npm run dev
    ```

    The app will be running at `http://localhost:3000`.

## Usage

Once the app is running:

- **Sign Up / Log In**: Create an account or log in using your credentials.
- **Dashboard**: View your financial overview with charts, expenses, and income.
- **Add Transactions**: Add income or expenses and categorize them for better tracking.
- **Set Budget**: Set up budgets for various categories and track your spending against them.
- **Set Pot(Savings)**: Set up Pots for various categories and track your savings.

## Demo

You can view the live demo of the app here:

[**Lofi Radio Demo**](https://lofiradio-proj.vercel.app/)

## Deployment

You can deploy this app to platforms like Vercel. Follow their documentation to set up your deployment:
Currently I am hosting on vercel.

- [Vercel Deployment](https://vercel.com/docs)

## Contributing

We welcome contributions to improve the app! To get started:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
