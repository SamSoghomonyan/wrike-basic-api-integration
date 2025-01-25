import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const USERS_URL = "https://www.wrike.com/api/v4/folders";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

interface Project {
  id: string;
  title: string;
  project: {
    authorId: string;
    ownerIds: string[];
    customStatusId: string;
    createdDate: string;
  };
}

interface Data {
  id: string;
  title: string;
  childIds: string[];
  project?: {
    authorId: string;
    ownerIds: string[];
    customStatusId: string;
    createdDate: string;
  };
}

async function getProjectInfo() {
  try {
    const response = await fetch(USERS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: { data: Data[] } = await response.json();
    // Filter and map projects with `project` field
    const projects: Project[] = data.data
      .filter((item) => item.project)
      .map((item) => ({
        id: item.id,
        title: item.title,
        project: {
          authorId: item.project!.authorId,
          ownerIds: item.project!.ownerIds,
          customStatusId: item.project!.customStatusId,
          createdDate: item.project!.createdDate,
        },
      }));

    await saveProjectToFile("project.json", JSON.stringify(projects, null, 2));
    console.log("Projects saved to project.json successfully!");
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

async function saveProjectToFile(
  filePath: string,
  content: string,
  encoding: BufferEncoding = "utf-8"
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, content, encoding, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default getProjectInfo;
