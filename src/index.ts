import getTasks from "./tasks";
import getUsers from "./users";
import getProjectInfo from "./project";
import fs from "fs";
async function run() {
  return {
    tasks: (await getTasks()) || [],
    project: (await getProjectInfo()) || [],
    users: (await getUsers()) || [],
  };
}

async function main() {
  const collectData = await run();
  const newData = collectData.project.map((project) => {
    const relatedTasks = collectData.tasks.filter(
      (task) => project.id === task.collections[0]
    );
    console.log(relatedTasks);
    const tasksNew = relatedTasks.map((task) => {
      const assignees = task.assignees.map((assagnees) =>
        collectData.users.find((user) => user.id === assagnees)
      );
      return {
        id: project.id,
        title: project.title,
        tasks: {
          id: task.id,
          name: task.name,
          assignees: assignees,
          status: task.status,
          created_at: task.created_at,
          updated_at: task.updated_at,
        },
      };
    });

    return tasksNew;
  });
  await saveToFile("data.json", JSON.stringify(newData, null, 2));
  return newData;
}

async function saveToFile(
  filpath: string,
  content: string,
  encoding: BufferEncoding = "utf-8"
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filpath, content, encoding, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

main();
