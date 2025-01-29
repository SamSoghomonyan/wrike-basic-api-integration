import { getTasks } from "./tasks";
import { getUsers } from "./users";
import { getProjectInfo } from "./project";
import { saveToFile } from "./writeFileUtils";
import { Data } from "./interfaces";

async function run() {
  const tasks = await getTasks();
  const projects = await getProjectInfo();
  const users = await getUsers();
  const result = projects.reduce<Data[]>((acc, project) => {
    const projectTasks = tasks?.filter((task) =>
      task.collections?.includes(project.id)
    );
    const projectData: Data = {
      id: project.id,
      title: project.title,
      tasks: projectTasks?.map((task) => {
        const assignees = task.assignees?.map((assigneeId) => {
          const assignee = users.find((user) => user.id === assigneeId);

          if (assignee) {
            return {
              name: assignee.name,
              surname: assignee.surname,
              id: assignee.id,
              primaryEmail: assignee.primaryEmail,
            };
          }
        });

        return {
          id: task.id,
          name: task.name,
          status: task.status,
          assignees: assignees,
          created_at: task.created_at,
          updated_at: task.updated_at,
          tiket_url: task.tiket_url,
        };
      }),
    };
    acc.push(projectData);
    return acc;
  }, []);
  await saveToFile("data.json", JSON.stringify(result, null, 2));
}

run().catch(console.error);
