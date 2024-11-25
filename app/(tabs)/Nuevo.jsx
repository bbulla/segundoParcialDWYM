import { useState, useCallback } from "react";
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkbox from 'expo-checkbox';

export default function Nuevo() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [isfavorite, setisFavorite] = useState(false);
    const navigation = useNavigation();
    const nuevoDestination = async () => {
        try {
            await axios.post('http://172.20.10.3:3000/destinations', {
                name,
                description,
                difficulty,
                isfavorite,
            });
            navigation.navigate('index')
        }
        catch (error) {
            console.log("hubo un error al crear el destino", error)
        }
    }
    useFocusEffect(
        useCallback(() => {
            setName('');
            setDescription('');
            setDifficulty('');
            setisFavorite(false);
        }, [])
    );
    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            extraScrollHeight={50}
            enableOnAndroid={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Crear Nuevo Destino</Text>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.label}>Dificultad: </Text>
                    <Text>Hard: </Text>
                    <Checkbox
                        
                        value={difficulty==="hard"}
                        onValueChange={()=>setDifficulty(difficulty==="hard"?"":"hard") }
                        
                    />
                    <Text>Medium: </Text>
                    <Checkbox
                        
                        value={difficulty==="medium"}
                        onValueChange={()=>setDifficulty(difficulty==="medium"?"":"medium") }
                        
                    />
                    <Text>Easy: </Text>
                    <Checkbox
                        
                        value={difficulty==="easy"}
                        onValueChange={()=>setDifficulty(difficulty==="easy"?"":"easy") }
                        
                    />
                <Text style={styles.label}>Favorito: </Text>
                <TextInput
                    style={styles.input}
                    value={isfavorite}
                    onChangeText={setisFavorite}
                />
                <TouchableOpacity style={styles.saveButton} onPress={nuevoDestination}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#4a4a4a',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#4a4a4a',
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#781cff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});