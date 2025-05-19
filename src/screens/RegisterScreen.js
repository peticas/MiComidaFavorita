import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleRegister = async () => {
    //console.log(password.length);
    if (regMail.test(email) === true) {
        if(password == confPassword){
            if (!regPasswd.test(password)) {
                ToastAndroid.showWithGravityAndOffset(
                "La contraseña debe tenemos como minimo 8 caracteres, una mayuscula una minuscula y un caracter especial",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
                );
                return;
            } else {
                try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                navigation.replace("Home");
                } catch (error) {
                setError("Error al registrarse: " + error.message);
                }
            }
        }else{
            ToastAndroid.showWithGravityAndOffset(
                "La contraseña no coincide",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Debe Ingresar un correo valido",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return;
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
