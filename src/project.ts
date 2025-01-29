import { fetchData } from "./apiUtils";
import { Project } from "./interfaces";
import { ProjectResponse } from "./interfaces";
const URL = "https://www.wrike.com/api/v4/folders?project=true";

export async function getProjectInfo() {
  const response: ProjectResponse = await fetchData(URL);

  console.log("response", response);
  const data = response.data;
  console.log("data", data);

  const projects: Project[] = data
    .filter((item) => item.project !== undefined)
    .map((item) => ({
      id: item.id,
      title: item.title,
      authorId: item.project!.authorId,
      ownerIds: item.project!.ownerIds,
      customStatusId: item.project!.customStatusId,
      createdDate: item.project!.createdDate,
    }));

  return projects;
}
