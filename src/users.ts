import { fetchData } from "./apiUtils";
import { User } from "./interfaces";
import { UsersResponse } from "./interfaces";

const USERS_URL = "https://www.wrike.com/api/v4/contacts";

export async function getUsers() {
  const response: UsersResponse = await fetchData(USERS_URL);
  const data = response.data;
  const users: User[] = data.map((user) => {
    return {
      id: user.id,
      name: user.firstName,
      surname: user.lastName,
      primaryEmail: user.primaryEmail,
    };
  });
  return users;
}
