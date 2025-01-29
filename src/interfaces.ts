export interface ProjectData {
  id: string;
  accountId: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  description: string;
  sharedIds: string[];
  parentIds: string[];
  childIds: string[];
  scope: string;
  permalink: string;
  workflowId: string;
  project?: ProjectDetails;
}

export interface ProjectDetails {
  authorId: string;
  ownerIds: string[];
  customStatusId: string;
  createdDate: string;
}

export interface ProjectResponse {
  kind: string;
  data: ProjectData[];
}

export interface Project {
  id: string;
  title: string;
  authorId: string;
  ownerIds: string[];
  customStatusId: string;
  createdDate: string;
}

export interface TaskstData {
  id: string;
  accountId: string;
  title: string;
  parentIds: string[];
  responsibleIds: string[];
  status: string;
  importance: string;
  createdDate: string;
  updatedDate: string;
  dates: {
    type: string;
    duration: number;
    start: string;
    due: string;
  };
  scope: string;
  customStatusId: string;
  permalink: string;
}

export interface TasksResponse {
  kind: string;
  data: TaskstData[];
}

export interface Task {
  id: string;
  name: string;
  assignees: string[];
  status: string;
  collections: string[];
  created_at: string;
  updated_at: string;
  tiket_url: string;
}

export interface UsersData {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  profiles: string[];
  avatarUrl: string;
  timezone: string;
  local: string;
  deleted: boolean;
  primaryEmail: string;
  memberIds?: string[];
  myTeam?: boolean;
}

export interface UsersResponse {
  kind: string;
  data: UsersData[];
}

export interface User {
  name: string;
  surname: string;
  primaryEmail: string;
  id: string;
}

export interface Data {
  id: string;
  title: string;
  tasks: dataTasks[] | [];
}

interface assignees {
  name: string;
  surname: string;
  id: string;
  primaryEmail: string;
}

interface dataTasks {
  id: string;
  name: string;
  status: string;
  assignees: (assignees | undefined)[];
  created_at: string;
  updated_at: string;
  tiket_url: string;
}
