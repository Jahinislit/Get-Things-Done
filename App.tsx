// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxScreen from "./app/inbox/InboxScreen";
import ProcessTaskScreen from "./app/inbox/ProcessTaskScreen";
import ProjectsScreen from "./app/projects/ProjectsScreen";
import NextActionsScreen from "./app/next-actions/NextActionsScreen";
import { loadData } from "./utils/taskStore";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inbox">
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Process Task" component={ProcessTaskScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="Next Actions" component={NextActionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
