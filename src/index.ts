import getTasks from "./tasks";
import getUsers from "./users";
import getProjectInfo from "./project";
async function run(): Promise<void> {
  await getTasks();
  await getUsers();
  await getProjectInfo();
}

run();
