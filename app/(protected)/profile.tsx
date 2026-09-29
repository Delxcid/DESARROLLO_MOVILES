import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../src/context/AuthContext";
import { AuthService } from "../src/auth/services/auth.service";

export default function Profile() {
  const router = useRouter();
  const { user, token, updateUserSession } = useAuth();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastname(user.lastName || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdateUser = async () => {
    if (!name.trim() || !lastname.trim() || !phone.trim()) {
      Alert.alert("Campos incompletos", "Por favor llenar los campos");
      return;
    }
    if (!user?.id || !token) {
      Alert.alert("Error de sesion", " No se encontro el usuario");
      return;
    }

    setIsUpdating(true);
    try {
      const updateUser = await AuthService.updateUser(
        user.id,
        name,
        lastname,
        phone,
        token,
      );
      await updateUserSession(updateUser);
      Alert.alert("excelente", "tu informacion ha sido actualizada con exito");
    } catch (error: any) {
      Alert.alert("Error de register", error.message || "no se pudo actualizar");
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(protected)/dashboard")}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#005C3A" />
        </TouchableOpacity>
        <Text style={styles.LogoText}>ShopEase</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.profileCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/56/e1/a1/56e1a1401b68e0981831053e86ef457c.jpg",
              }}
              style={styles.ProfileAvatar}
            />

            <TouchableOpacity style={styles.Camarabtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>William Ernesto Paz Del Cid</Text>
          <Text style={styles.profileSuptitle}>Full Stack Developer</Text>
          {/**CARDS POINTS */}
          <View style={styles.CardPoints}>
            <View style={[styles.cardpointBox, styles.cardOrderColor]}>
              <Text style={styles.cardOrderText}>Orders</Text>
              <Text style={styles.cardOrderNumbers}>24</Text>
            </View>
            <View style={[styles.cardpointBox, styles.cardPointsColor]}>
              <Text style={styles.cardPointsText}>Points</Text>
              <Text style={styles.cardPointsNumbers}>1250</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.personalHeader}>personal information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>NAME</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                style={styles.inputIcon}
                value={user?.name || "usuario no identificado"}
              />
              <TextInput
                placeholder="full name"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>LASTNAME</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="LASTNAME"
                style={styles.input}
                value={lastname}
                onChangeText={setLastname}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateUser}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.updateButtonText}>Save change</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: "100%",
    height: 60,
    backgroundColor: "#f3f4f6",
  },
  LogoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005C3A",
    paddingHorizontal: 12,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  imageWrapper: {
    position: "relative",
    marginBottom: 16,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 24,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },

  ProfileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Camarabtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#005C3A",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  profileSuptitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 20,
  },
  CardPoints: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardpointBox: {
    paddingVertical: 14,
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB",
    marginHorizontal: 6,
  },
  cardOrderColor: {
    backgroundColor: "#DBEAFE",
  },
  cardPointsColor: {
    backgroundColor: "#E2F0FC",
  },
  cardOrderText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4B5563",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardPointsText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4B5563",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardOrderNumbers: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005C3A",
  },
  cardPointsNumbers: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005C3A",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  personalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 10,
    color: "#4B5563",
    letterSpacing: 1,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#Fff",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1f2937",
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 10,
  },

  updateButton: {
    flexDirection: "row",
    backgroundColor: "#005C3A",
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
