import dotenv from "dotenv";
import fs from "fs";

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

    await writeFileExample("tasks.json", JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

function writeFileExample(
  filePath: string,
  content: string,
  encoding: BufferEncoding = "utf-8"
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, content, encoding, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}



export default getTasks;
