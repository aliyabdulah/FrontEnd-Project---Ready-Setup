import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

import AuthContext from "@/context/Authcontext";
import { storeToken } from "../../api/storage";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleRegister = async () => {
    if (username.trim() && password.trim() && confirmPassword.trim()) {
      if (password === confirmPassword) {
        // TODO: Replace with real API register and store returned token
        await storeToken("dummy-token-" + Date.now());
        setIsAuthenticated(true);
        router.replace("/(protected)/testhomepage");
      } else {
        console.log("Passwords don't match");
      }
    }
  };

  const goToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
            <Text style={styles.loginButtonText}>
              Already have an account? Login
            </Text>
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
  form: {
    backgroundColor: "white", padding: 20, borderRadius: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5,
  },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8,
    padding: 15, marginBottom: 15, fontSize: 16,
  },
  registerButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, marginBottom: 15 },
  registerButtonText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "600" },
  loginButton: { padding: 10 },
  loginButtonText: { color: "#007AFF", textAlign: "center", fontSize: 14 },
});
