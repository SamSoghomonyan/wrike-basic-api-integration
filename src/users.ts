import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

interface Data {
  id: string;
  lastName: string;
  firstName: string;
  type: string;
  profiles: [{}];
  avatarUrl: string;
  timezone: string;
  locale: string;
  deleted: boolean;
  primaryEmail: string;
}

interface User {
  name: string;
  surname: string;
  primaryEmail: string;
  id: string;
}

const USERS_URL = "https://www.wrike.com/api/v4/contacts";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function getUsers() {
  const response = await fetch(USERS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  const data: { data: Data[] } = await response.json();
  console.log("users", data.data);
  const users: User[] = data.data.map((user) => {
    return {
      id: user.id,
      name: user.firstName,
      surname: user.lastName,
      primaryEmail: user.primaryEmail,
    };
  });
  await wrteFileExample("users.json", JSON.stringify(users, null, 2));
  console.log("users", users);
}

async function wrteFileExample(
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

async function runUsers() {
  await getUsers();
}

export default runUsers;
