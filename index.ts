import getTasks from "./src/tasks";
import getUsers from "./src/users";
async function run(): Promise<void> {
  await getTasks();
  await getUsers();
}

run();
