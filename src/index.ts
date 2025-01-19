import dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

const Task_URL = "https://www.wrike.com/api/v4/tasks";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;

if (!ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN is not defined in the environment variables.");
}

interface Task {
  id: string;
  name: string;
  status: string;
  collections: string;
  created_at: string;
  updated_at: string;
  tiket_url: string;
  assignees: Assignee[];
}

interface Assignee {
  name: string;
  surname: string;
}

interface ApiResponse<T> {
  data: T;
}

const task_id: string[] = [];
const Global_Tasks: Task[] = [];

const fetchTasksId = async (): Promise<void> => {
  try {
    const response = await fetch(Task_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse<{ id: string }[]> = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response: No data found.");
    }

    data.data.forEach((task) => task_id.push(task.id));
  } catch (error) {
    console.error("Error fetching task IDs:", error);
  }
};

const fetchTasks = async (): Promise<void> => {
  try {
    console.log("Task IDs:", task_id);

    if (task_id.length === 0) {
      console.error("No task IDs found! Exiting...");
      return;
    }

    await Promise.all(
      task_id.map(async (taskId) => {
        const response = await fetch(`${Task_URL}/${taskId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        const data: ApiResponse<any[]> = await response.json();
        const single_data = data.data[0];

        const assignees: Assignee[] = await Promise.all(
          single_data.responsibleIds.map(async (userId: string) => {
            const userResponse = await fetch(
              `https://www.wrike.com/api/v4/users/${userId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const userData: ApiResponse<any[]> = await userResponse.json();
            const user = userData.data[0];

            return {
              name: user.firstName,
              surname: user.lastName,
            };
          })
        );

        Global_Tasks.push({
          id: single_data.id,
          name: single_data.title,
          status: single_data.status,
          collections: single_data.parentIds[0],
          created_at: single_data.createdDate,
          updated_at: single_data.updatedDate,
          tiket_url: single_data.permalink,
          assignees: assignees,
        });
      })
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const saveTasksToFile = async (): Promise<void> => {
  try {
    await fs.writeFile("tasks.json", JSON.stringify(Global_Tasks, null, 2));
    console.log("Tasks saved to tasks.json");
  } catch (error) {
    console.error("Error saving tasks to file:", error);
  }
};

const run = async (): Promise<void> => {
  await fetchTasksId();
  await fetchTasks();
  await saveTasksToFile();
};

run();
