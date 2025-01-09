# TypeScript Node.js Project - Wrike Task Fetcher API

This is a Node.js project written in TypeScript that fetches tasks from Wrike using the Wrike API. The project not only fetches and saves task data but also exposes an API endpoint to retrieve the fetched tasks in JSON format. It is built using TypeScript and can be compiled and run on Node.js.

## Prerequisites

- Node.js (v20.x or higher)
- npm (v10.x or higher)
- TypeScript

## Setup

### 1. Clone the Repository

If you haven't already cloned the repository, you can do so using:

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

Install the required dependencies using `npm`:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add your environment variables. You can refer to the `.env.example` for a sample configuration.

```bash
API_URL=<your-api-url>
ACCESS_TOKEN=<your-access-token>
```

### 4. Compile TypeScript to JavaScript

To compile your TypeScript files to JavaScript, run:

```bash
npm run build
```

This will generate JavaScript files in the `dist/` directory.

### 5. Run the Project

After building the project, you can run the compiled JavaScript code:

```bash
npm start
```

This will:

1. Fetch tasks from the Wrike API.
2. Return the tasks as a JSON response when you visit the `/tasks` API endpoint (via `http://localhost:<PORT>/tasks`).
3. Save the tasks in a `tasks.json` file in the root directory.

## API Endpoint

- **GET /tasks**: Fetches task data from the Wrike API and returns it as a JSON response.

  Example request:
  ```bash
  GET http://localhost:<PORT>/tasks
  ```

  Example response:
  ```json
  [
    {
      "id": "task-id-1",
      "name": "Task Name 1",
      "assignees": ["assignee1", "assignee2"],
      "status": "In Progress",
      "collections": ["collection1", "collection2"],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-02T00:00:00Z",
      "ticket_url": "https://www.wrike.com/open.htm?id=task-id-1"
    },
    ...
  ]
  ```

## Project Structure

```
<project-folder>/
├── dist/               # Compiled JavaScript files
│   └── index.js        # Your entry point file
├── src/                # TypeScript source files
│   └── index.ts        # Your main TypeScript file
├── .gitignore          # Git ignore file
├── .env                # Environment variables
├── .env.example        # Example environment 
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Scripts

- `npm run build`: Compiles the TypeScript files into JavaScript in the `dist/` directory.
- `npm start`: Runs the compiled JavaScript using Node.js.
- `npm run dev`: Runs the JavaScript using Node.js in the development mode.

