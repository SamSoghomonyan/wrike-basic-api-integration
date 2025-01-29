import { fetchData } from "./apiUtils";
import { TasksResponse } from "./interfaces";
import { Task } from "./interfaces";

const TASKS_URL: string =
  'https://www.wrike.com/api/v4/tasks?fields=["responsibleIds","parentIds"]';

async function getTasks() {
  const response: TasksResponse = await fetchData(TASKS_URL);
  const data = response.data;

  const tasks: Task[] = data.map((task) => {
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
  return tasks;
}

export default getTasks;
