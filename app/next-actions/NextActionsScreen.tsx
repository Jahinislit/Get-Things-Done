// app/next-actions/NextActionsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,

} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { styles } from "../../styles/global";
import { taskStore, toggleComplete } from "../../utils/taskStore";
import { Task } from "../../types";

export default function NextActionsScreen() {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const filterTasks = (): Task[] => {
    return taskStore.tasks.filter((task) => {
      if (task.status !== "nextAction") return false;
      if (selectedContext && task.context !== selectedContext) return false;
      if (selectedProjectId && task.projectId !== selectedProjectId)
        return false;
      return true;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Actions</Text>

      {/* Context Filter */}
      <View style={{ marginBottom: 10 }}>
        <Text>Filter by Context:</Text>
        <FlatList
          horizontal
          data={["@home", "@work", "@errands", "@computer"]}
          keyExtractor={(ctx) => ctx}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedContext(selectedContext === item ? null : item)
              }
              style={{
                backgroundColor:
                  selectedContext === item ? "#007bff" : "#ccc",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Project Filter */}
      <View style={{ marginBottom: 10 }}>
        <Text>Filter by Project:</Text>
        <FlatList
          horizontal
          data={taskStore.projects}
          keyExtractor={(proj) => proj.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedProjectId(
                  selectedProjectId === item.id ? null : item.id
                )
              }
              style={{
                backgroundColor:
                  selectedProjectId === item.id ? "#007bff" : "#ccc",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filterTasks()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => toggleComplete(item.id)}
          >
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: item.completed ? "line-through" : "none",
                color: item.completed ? "#999" : "#000",
              }}
            >
              ✅ {item.title}
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              {item.context}{" "}
              {item.projectId &&
                ` • ${
                  taskStore.projects.find((p) => p.id === item.projectId)?.name
                }`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
