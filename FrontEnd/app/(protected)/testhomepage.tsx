import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import AuthContext from "@/context/Authcontext";
import { deleteToken } from "../../api/storage";

export default function TestHomePage() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await deleteToken();
    setIsAuthenticated(false);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MyNewSimulator!</Text>
        <Text style={styles.subtitle}>
          You are now logged in and viewing the protected home page.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Authentication Status</Text>
          <Text style={styles.infoText}>✅ Successfully authenticated</Text>
          <Text style={styles.infoText}>🔒 Protected route accessed</Text>
          <Text style={styles.infoText}>🎯 Ready for your features</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: {
    fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#333",
  },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 40, color: "#666" },
  infoCard: {
    backgroundColor: "white", padding: 20, borderRadius: 12, marginBottom: 30,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5,
  },
  infoTitle: { fontSize: 18, fontWeight: "600", marginBottom: 15, color: "#333", textAlign: "center" },
  infoText: { fontSize: 14, marginBottom: 8, color: "#666", textAlign: "center" },
  buttonContainer: { alignItems: "center" },
  logoutButton: { backgroundColor: "#FF3B30", padding: 15, borderRadius: 8, minWidth: 120 },
  logoutButtonText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
