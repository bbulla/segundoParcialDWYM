import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkbox from 'expo-checkbox';


export default function Detalles() {
    const route = useRoute();

    const { destination } = route.params;
    const [actualDestination, setActualDestination] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [isfavorite, setisFavorite] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        getDestination(destination);
    }, []);
    const actualizarDestination = async () => {
        try {
            await axios.put(`http://172.20.10.3:3000/destinations/${actualDestination.id}`, {
                name,
                description,
                difficulty,
                isfavorite,
            });
            setIsEditing(false);
            const id = actualDestination.id;
            setActualDestination({
                id: id,
                name,
                description,
                difficulty,
                isfavorite,
            });

        }
        catch (error) {
            console.log("hubo un error al actualizar el destino", error)
        }
    }
    const deleteDestination = async () => {
        try {
            await axios.delete(`http://172.20.10.3:3000/destinations/${actualDestination.id}`);
            navigation.goBack();
        }
        catch (error) {
            console.log("hubo un error al eliminar el destino", error)
        }
    }
    const editDestination = () => {
        setIsEditing(true);
    }

    const getDestination = async (id) => {
        console.log(id)

            const response = await axios.get(`http://172.20.10.3:3000/destinations/${id}`);
            const destinationData = response.data;
            setActualDestination(destinationData);
            setName(destinationData.name);
            setDescription(destinationData.description || '');
            setDifficulty(destinationData.difficulty || '');
            setisFavorite(destinationData.isfavorite);
        
    }
    return (
        (isEditing) ?
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                extraScrollHeight={100}
                enableOnAndroid={true}
            >
                <Text style={styles.title}>Editar Destino</Text>
                <View
                    style={styles.container}
                >
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
                        value={(isfavorite) ? 'true' : 'false'}
                        onChangeText={setisFavorite}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={actualizarDestination}>
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            :
            <View style={{ height: '100%' }}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{actualDestination.name}</Text>
                    <Text style={styles.description}>{actualDestination.description}</Text>
                    <Text style={styles.subtitle}>Dificultad: {actualDestination.difficulty} </Text>
                    <Text style={styles.subtitle}>Favorito: {(actualDestination.isfavorite) ? 'true' : 'false'} </Text>
                    
                    <TouchableOpacity style={styles.editButton} onPress={editDestination}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteDestination}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#4a4a4a',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        color: '#4a4a4a',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
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
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    editButton: {
        backgroundColor: '#781cff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#789cff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#781cff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});