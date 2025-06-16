// types/index.ts

export interface Task {
  id: string;
  title: string;
  status: "inbox" | "nextAction" | "project";
  context?: "@home" | "@work" | "@errands" | "@computer";
  projectId?: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
}
