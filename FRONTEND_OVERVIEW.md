# Task Management Frontend Overview

This document provides a brief overview of the frontend components for a task management application.

## API Service (`api.ts`)

The `api.ts` file handles communication with the backend API. It uses Axios to make HTTP requests and retrieves the base API URL from the `VITE_API_URL` environment variable.

**Key Functions:**

- `createTask(task)`: Creates a new task.
- `getTasks()`: Retrieves all tasks.
- `updateTask(id, task)`: Updates an existing task.
- `deleteTask(id)`: Deletes a task.

## Task List Component (`TaskList.vue`)

The `TaskList.vue` component displays a list of tasks. It fetches tasks from the API and allows users to mark tasks as completed or delete them.

**Key Features:**

- Displays a list of tasks with titles and descriptions.
- Allows users to mark tasks as completed.
- Allows users to delete tasks.
- Uses Tailwind CSS for styling.
- Displays a header for the title, description and actions.

**Key Methods:**

- `fetchTasks()`: Fetches tasks from the API.
- `toggleTaskCompletion(task)`: Toggles the completion status of a task.
- `deleteTaskFromList(taskId)`: Deletes a task.

## Environment Variables (`.env`)

The `.env` file, located in the root of the project, is used to store environment-specific configuration variables. This allows you to manage settings like API URLs separately from your code, making it easier to switch between development, staging, and production environments.

**Key Variable:**

- `VITE_API_URL`: This variable defines the base URL for the backend API. The `api.ts` file uses this variable to construct the URLs for all API requests.

**Example:**

```properties
VITE_API_URL=http://localhost:3000/api/v1
```
