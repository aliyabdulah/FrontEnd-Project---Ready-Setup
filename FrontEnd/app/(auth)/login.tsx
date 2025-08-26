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
import { login as loginUser } from "../../api/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    if (username.trim() && password.trim()) {
      try {
        // Call your real backend API
        const response = await loginUser({
          username,
          password
        });
        
        if (response.success) {
          setIsAuthenticated(true);
          router.replace("/(protected)/testhomepage");
        } else {
          console.log("Login failed:", response.error);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const goToRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
            <Text style={styles.registerButtonText}>
              Don&apos;t have an account? Register
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
  loginButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, marginBottom: 15 },
  loginButtonText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "600" },
  registerButton: { padding: 10 },
  registerButtonText: { color: "#007AFF", textAlign: "center", fontSize: 14 },
});