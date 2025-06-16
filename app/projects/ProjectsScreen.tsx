// app/projects/ProjectsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "../../styles/global";
import { createProject, taskStore } from "../../utils/taskStore";

export default function ProjectsScreen() {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    if (projectName.trim()) {
      createProject(projectName.trim());
      setProjectName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>

      <TextInput
        style={styles.input}
        placeholder="New project name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Add Project</Text>
      </TouchableOpacity>

      <FlatList
        data={taskStore.projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 16 }}>📁 {item.name}</Text>
            {taskStore.tasks
              .filter((t) => t.projectId === item.id)
              .map((task) => (
                <Text key={task.id} style={{ marginLeft: 8, color: "#444" }}>
                  • {task.title}
                </Text>
              ))}
          </View>
        )}
      />
    </View>
  );
}
