import dotenv from "dotenv";
import axios from "axios";
import express, { Request, Response } from "express";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
console.log("API_URL", API_URL);
if (!API_URL || !ACCESS_TOKEN) {
  console.error(
    "API_URL or ACCESS_TOKEN is not defined in environment variables"
  );
  process.exit(1);
}

interface Task {
  id: string;
  title: string;
  responsibles: string[];
  status: string;
  parentIds: string[];
  createdDate: string;
  updatedDate: string;
  permalink: string;
}

interface MappedTask {
  id: string;
  name: string;
  assignees: string[];
  status: string;
  collections: string[];
  created_at: string;
  updated_at: string;
  ticket_url: string;
}

app.get("/tasks", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get<{ data: Task[] }>(API_URL, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    const tasks: MappedTask[] = response.data.data.map((task) => ({
      id: task.id,
      name: task.title,
      assignees: task.responsibles,
      status: task.status,
      collections: task.parentIds,
      created_at: task.createdDate,
      updated_at: task.updatedDate,
      ticket_url: task.permalink,
    }));

    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    console.log("tasks.json file generated successfully!");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
