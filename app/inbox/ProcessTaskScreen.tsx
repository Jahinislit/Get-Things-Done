// app/inbox/ProcessTaskScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { styles } from "../../styles/global";
import {
  taskStore,
  processTaskToNextAction,
  assignTaskToProject,
  createProject,
} from "../../utils/taskStore";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";

const CONTEXTS = ["@home", "@work", "@errands", "@computer"] as const;

export default function ProcessTaskScreen() {
  const route = useRoute<RouteProp<{ params: { taskId: string } }, "params">>();
  const navigation = useNavigation();
  const { taskId } = route.params;
  const task = taskStore.tasks.find((t) => t.id === taskId);

  const [newProjectName, setNewProjectName] = useState("");

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  const handleAssignContext = (context: string) => {
    processTaskToNextAction(task.id, context as any);
    navigation.goBack();
  };

  const handleAssignProject = (projectId: string) => {
    assignTaskToProject(task.id, projectId);
    navigation.goBack();
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject = createProject(newProjectName.trim());
      assignTaskToProject(task.id, newProject.id);
      setNewProjectName("");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Process Task</Text>
      <Text style={{ marginBottom: 12 }}>{task.title}</Text>

      <Text style={{ fontWeight: "600", marginBottom: 8 }}>Assign Context:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {CONTEXTS.map((ctx) => (
          <TouchableOpacity
            key={ctx}
            onPress={() => handleAssignContext(ctx)}
            style={{
              backgroundColor: "#007bff",
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>{ctx}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ fontWeight: "600", marginVertical: 8 }}>Assign to Project:</Text>
      <FlatList
        data={taskStore.projects}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleAssignProject(item.id)}>
            <Text>📁 {item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="New project name..."
        value={newProjectName}
        onChangeText={setNewProjectName}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Create & Assign</Text>
      </TouchableOpacity>
    </View>
  );
}
