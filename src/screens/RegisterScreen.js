import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(value);
  };

  const validatePassword = (value, oValue) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    let msj = "";

    if (value != oValue) {
      msj = "La contraseña o coincide.\n";
    } else {
      if (!minLength.test(value)) {
        msj += "La contraseña debe tener al menos 8 caracteres.\n";
      }
      if (!uppercase.test(value)) {
        msj += "Debe incluir al menos una letra mayúscula.\n";
      }
      if (!lowercase.test(value)) {
        msj += "Debe incluir al menos una letra minúscula.\n";
      }
      if (!number.test(value)) {
        msj += "Debe incluir al menos un número.\n";
      }
      if (!specialChar.test(value)) {
        msj += "Debe incluir al menos un carácter especial.";
      }
    }
    return msj;
  };

  const handleRegister = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Ingresa un email válido.");
      valid = false;
    } else {
      setEmailError("");
    }

    const pwdError = validatePassword(password, confPassword);
    if (pwdError) {
      setPasswordError(pwdError);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.replace("Home");
      } catch (error) {
        setError("Error al iniciar sesión: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Registro
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Contraseña"
        value={confPassword}
        onChangeText={setConfPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate("Login")}
        containerStyle={styles.button}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
