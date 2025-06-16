// app/inbox/InboxScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "../../styles/global";
import { addInboxTask, taskStore } from "../../utils/taskStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  "Process Task": { taskId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function InboxScreen() {
  const [text, setText] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleAdd = () => {
    if (text.trim()) {
      addInboxTask(text.trim());
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Things Done</Text>

      <TextInput
        style={styles.input}
        placeholder="Type a new task..."
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add to Inbox</Text>
      </TouchableOpacity>

      <FlatList
        data={taskStore.tasks.filter((t) => t.status === "inbox")}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Process Task", {
                taskId: item.id,
              })
            }
          >
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: "#888", marginTop: 4 }}>Tap to process</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
