import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UserForm from "./componentes/UserForm";
import UserList from "./componentes/UserList";

export default function App(){
  const [users, setUsers]  = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () =>{
    try{
      setLoading(true);
      const reponse = await fetch("http://10.110.12.47:3000/users");
      const data = await reponse.json();
      setUsers(data);
    }catch(error){
      console.error("Error Get: ", error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  },[]);

  return(
    <View style ={styles.container}>
      <Text style={styles.title}>CRUD com fetch</Text>
      <UserForm onUserAdded={fetchUsers}/>
      <ScrollView>
        {loading ?(
          <Text> Carregando...</Text>
        ):(
          <UserList users={users} onUserChanget={fetchUsers}/>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20, marginTop:40},
  title:{fontSize:22,fontWeight: "bold", marginTop:20}
})