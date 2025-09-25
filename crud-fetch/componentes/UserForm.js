import { useState } from "react";
import { View, TextInput, Button, StyleSheet} from "react-native";

export default function UserForm({onUserAdded}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const addUser = async () => {
        if( !name || !email) return ; 

        try{
            const reponse = await fetch("http://10.110.12.47:3000/users",
                {
                    method: "Post",
                    headers:{"content-type":"aplication/json"},
                    body: JSON.stringify({name,email})
                })
            setName("");
            setEmail("");
            onUserAdded("");
        }catch(error){
            console.error("Erro ao adicionar usuario", error.message);
        }
    };

    return(
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Adicionar Usuario"
                    onPress={addUser}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {marginBottom:20},
    input:{
        borderWidth:1,
        borderColor: "#ccc",
        marginBottom:10,
        borderRadius:5
    }
});