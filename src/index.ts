import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

interface Data {
  id: string;
  accountId: string;
  title: string;
  parentIds: string[];
  responsibleIds: string[];
  status: string;
  importance: string;
  createdDate: string;
  updatedDate: string;
  dates: {
    type: string;
    duration: number;
    start: string;
    due: string;
  };
  scope: string;
  customStatusId: string;
  permalink: string;
}

interface Task {
  id: string;
  name: string;
  assignees: string[];
  status: string;
  collections: string[];
  created_at: string;
  updated_at: string;
  tiket_url: string;
}

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const TASKS_URL: string =
  'https://www.wrike.com/api/v4/tasks?fields=["responsibleIds","parentIds"]';

async function getTasks(): Promise<void> {
  try {
    if (!ACCESS_TOKEN) {
      throw new Error(
        "ACCESS_TOKEN is not defined in the environment variables."
      );
    }

    const response = await fetch(TASKS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tasks: ${response.status} ${response.statusText}`
      );
    }

    const data: { data: Data[] } = await response.json();

    const tasks: Task[] = data.data.map((task) => {
      return {
        id: task.id,
        name: task.title,
        assignees: task.responsibleIds,
        status: task.status,
        collections: task.parentIds,
        created_at: task.createdDate,
        updated_at: task.updatedDate,
        tiket_url: task.permalink,
      };
    });
    saveTasksToFile(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

async function saveTasksToFile(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), "utf-8");
    console.log("Tasks saved to tasks.json");
  } catch (err) {
    console.error("Error saving tasks to file:", err);
  }
}

async function run(): Promise<void> {
  await getTasks();
}

run();
