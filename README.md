# ✅ GTD Productivity App

A simple **Getting Things Done (GTD)**-based personal productivity app built using **React Native**, **Expo**, and **TypeScript**. It helps you capture tasks, process them into projects or next actions, and engage with your actionable list using filters by context or project.

---

## 🧠 Features

- **📥 Inbox**  
  Quickly capture any task, idea, or note.

- **🧹 Process Tasks**  
  Convert tasks from Inbox to Projects or Next Actions, assign contexts like `@home`, `@work`, etc.

- **📁 Projects**  
  Create projects and associate tasks with them.

- **⚡ Next Actions**  
  Filter actionable tasks by context or project. Mark them as complete when done.

---

## 📱 Screens

- **Inbox Screen**: Add new tasks and process them.
- **Process Task Screen**: Assign context/project to tasks.
- **Projects Screen**: Create and view project-wise grouped tasks.
- **Next Actions Screen**: View, filter, and complete actionable tasks.

---

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage) – for persistent local storage
- [uuid](https://www.npmjs.com/package/uuid) – for unique IDs

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/gtd-productivity-app.git
   cd gtd-productivity-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the development server**  
   ```bash
   npx expo start
   ```

---

## 📁 Folder Structure

```
.
├── app/
│   ├── inbox/
│   │   ├── InboxScreen.tsx
│   │   └── ProcessTaskScreen.tsx
│   ├── next-actions/
│   │   └── NextActionsScreen.tsx
│   └── projects/
│       └── ProjectsScreen.tsx
├── styles/
│   └── global.ts
├── types/
│   └── index.ts
├── utils/
│   └── taskStore.ts
├── App.tsx
└── README.md
```

---

## 🔐 GTD Methodology Overview

- **Capture** → Inbox
- **Process** → Assign to Project or Next Action
- **Organize** → By Context/Project
- **Engage** → Work from your filtered Next Actions list

---

## 🙌 Credits

Built with ❤️ by Jahin Halder as a learning project on productivity and React Native development.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
