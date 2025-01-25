import getTasks from "./tasks";
import getUsers from "./users";
async function run(): Promise<void> {
  await getTasks();
  await getUsers();
}

run();
