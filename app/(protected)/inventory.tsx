import { Ionicons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Touchable, TouchableOpacity, View, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InventoryScreen(){
    const router = useRouter ()
  return(
    <SafeAreaView style={styles.container}>
        <Drawer.Screen options={{headerShown:false}}/>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}
        >
            <View style={styles.header}>
                <TouchableOpacity 
                onPress={()=>router.replace("/(protected)/dashboard")}
                >
                    <Ionicons name="arrow-back-outline" size={26}/>
                </TouchableOpacity>



                <View style={styles.titleWrapper}>
    <Text style={styles.headerTitle}>ADMIN PORTAL</Text>
    <Text  style={styles.headerSubTitle}>Nueva Categoria</Text>
</View>

<View style={styles.boxIconContiner}>
    <Ionicons name="archive-outline" size={20}/>
</View>



            </View>


            <ScrollView contentContainerStyle={styles.scrollcontent}showsVerticalScrollIndicator={false} >

                <Text style={styles.logoText}>
                    ingrea los datos esenciales para catalogar los productos en el inventario
                </Text>

<View style={styles.formCard}>
    <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nombre de la categoria</Text>
        <TextInput
            placeholder="Ej. Dulceria"
            style={styles.textInput}
        />

    </View>
    <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>descripcion</Text>
        <TextInput
            placeholder="Describe los productos que engloban esta categoria"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={styles.textAreaInput}
        />

    </View>
    <TouchableOpacity
    style={styles.btnSave}
>
    <Ionicons style={styles.checkIcon} name="checkmark-outline" size={22} color="#FFF"/>
    <Text style={styles.btnSaveText}>Guardar Categoria</Text>

</TouchableOpacity>

    <TouchableOpacity
    style={styles.btnCancel}
>
    <Ionicons style={styles.checkIcon} name="checkmark-outline" size={22} color="#FFF"/>
    <Text style={styles.btnCancelText}>Cancelar</Text>

</TouchableOpacity>
</View>



</ScrollView>
        </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F9FAFB"
  },

  header:{
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical:14,
  backgroundColor:"#f9fafb"
  },

  titleWrapper:{
    flex: 1,
    marginLeft:16
  },

  headerTitle:{
fontSize:20,
fontWeight:"bold",
color: "#111827",
letterSpacing:0.8
  },

  headerSubTitle:{
    fontSize:10,
    fontWeight:"bold",
    color:"#006c47",
    marginTop:2

  },

  boxIconContiner:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:"#e5e7eb",
    alignItems: "center",
    justifyContent: "center"
  },



scrollcontent:{
    paddingHorizontal:16,
    paddingTop:16
},
logoText:{
    fontSize:14,
    color:"#4b5563",
    lineHeight:20,
    marginBottom:24
},

formCard:{
    backgroundColor:"#FFF",
    padding:24,
    borderRadius:16,
    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.03,
    shadowRadius:15,
    elevation:2
},

inputGroup:{
    marginBottom:10
},

inputLabel:{
    fontSize:13,
    fontWeight:"bold",
    color:"#374151",
    marginBottom:8
},
textInput:{
    height:48,
    borderWidth:1,
    borderColor:"#e5e7eb",
    paddingHorizontal:16,
    fontSize:14,
    borderRadius:10
},
textAreaInput:{
    height:120,
    borderWidth:1,
    borderColor:"#e5e7eb",
     borderRadius:10,
     paddingHorizontal:16,
     paddingVertical: 12,
     fontSize:14
},

btnSave:{
    backgroundColor:"#006C47",
    height:48,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:16
},
checkIcon:{
    marginRight:8
},
btnSaveText:{
    color:"#FFF",
    fontSize:15,

},

btnCancel:{
    height:24,
    justifyContent:"center",
    alignItems:"center",

},

btnCancelText:{
    fontSize:15,
    color:"#6b7280",
    fontWeight:500
}

})