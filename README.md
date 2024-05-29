# Monorepo Project Documentation

This documentation covers the setup and development instructions for the
monorepo containing a Fastify-based server, a Single Page Application (SPA) with
MUI and Redux, and various packages for UI components, utilities, and database
configurations.

## Structure

The monorepo is organized into the following directories and packages:

- `server`: Contains the backend API built with Fastify.
- `web`: Houses the SPA using React, MUI (Material-UI), and Redux.
- `packages`:
  - `ui`: Common UI components like inputs, buttons, etc.
  - `utils`: Common constants, types, API types, etc.
  - `db`: Database schemas and connection objects.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [pnpm](https://pnpm.io/installation) as the package manager

## Installation

To install all dependencies across the packages and apps in the monorepo, run
the following command in the root directory:

```sh
pnpm install
```

## Configuration

### Environment Variables

For the server to operate correctly, you need to set up the necessary
environment variables. Create a `.env` file in the `server` directory with the
following content:

```plaintext
OPENAI_API_KEY='your_openai_api_key_here'
```

Replace `'your_openai_api_key_here'` with your actual OpenAI API key.

## Development

To run both the server and the web app in development mode, execute:

```sh
pnpm dev
```

This command is configured to concurrently launch the server and the web app,
allowing for full-stack development testing.
