import { View, Text, Button, StyleSheet } from "react-native";

export default function UserList({users, onUserChanget}){

    const updateUser = async (id) => {
        try{
            const reponse = await fetch('http://10.110.12.47:3000/users/${id}',
            {
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body:JSON.stringify({
                    name:"Nome atualizado",
                    email:"atualizado@email"
                })
            })
            await reponse.json();

        }catch(error){
            console.error("Erro PUT", error.message);
        }
    }

    const deleteUser = async (id) =>{
        try{
            await fetch('http://10.110.12.47:3000/users/${id}',
                {method:"DELETE"});
            onUserChanget();            
        }catch(error){
            console.error("ERROR DELETE: ", error.message);
        }
    };

    return (
        <View>
            {users.map((u) =>(
                <View key={u.id} style= {styles.card}>
                    <Text style={styles.text}>{u.name} - {u.email}</Text>
                    <View style={styles.buttons}>
                        <Button title="Editar" onPress={() => updateUser(u.id)} />
                        <Button title="Deletar" onPress={() => deleteUser(u.id)} color="red"/>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        padding:10,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
        borderRadius:5
    },
    text: {
        fontSize:16,
        marginBottom: 5},
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"}
});

