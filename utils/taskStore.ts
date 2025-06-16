// utils/taskStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, Project } from "../types";

// Custom UUID generation function that's compatible with React Native
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const taskStore: {
  tasks: Task[];
  projects: Project[];
} = {
  tasks: [],
  projects: [],
};

const TASKS_KEY = "TASKS";
const PROJECTS_KEY = "PROJECTS_KEY";

async function saveData() {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(taskStore.tasks));
  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(taskStore.projects));
}

export async function loadData() {
  const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
  const projectsJson = await AsyncStorage.getItem(PROJECTS_KEY);
  taskStore.tasks = tasksJson ? JSON.parse(tasksJson) : [];
  taskStore.projects = projectsJson ? JSON.parse(projectsJson) : [];
}

export function addInboxTask(title: string): Task {
  const task: Task = {
    id: generateUUID(),
    title,
    status: "inbox",
    completed: false,
  };
  taskStore.tasks.push(task);
  saveData();
  return task;
}

export function createProject(name: string): Project {
  const project: Project = {
    id: generateUUID(),
    name,
  };
  taskStore.projects.push(project);
  saveData();
  return project;
}

export function processTaskToNextAction(taskId: string, context: Task["context"]) {
  const task = taskStore.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = "nextAction";
    task.context = context;
    saveData();
  }
}

export function assignTaskToProject(taskId: string, projectId: string) {
  const task = taskStore.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = "project";
    task.projectId = projectId;
    saveData();
  }
}

export function toggleComplete(taskId: string) {
  const task = taskStore.tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveData();
  }
}
