import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { TouchableOpacity, FlatList, View, StyleSheet, Text } from "react-native";
import {useNavigation, useFocusEffect} from '@react-navigation/native';


export default function DestinationListScreen() {
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        getDestinations();
    }, []);
    const navigation = useNavigation();

    const getDestinations = async () => {
        try {
            const response = await axios.get('http://172.20.10.3:3000/destinations');
            setDestinations(response.data);
        }
        catch (error) {
            console.error("Hubo un error consultando los destinos");
        }
    }
    useFocusEffect(
        useCallback(() => {
            getDestinations();
        }, [])
    );
    return (
        <View
            style={styles.container}

        >
            <FlatList
                data={destinations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Detalles', { destination: item.id })
                        }>
                        <View style={styles.destinationContainer}>
                            <Text style={styles.destinationName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}>
            </FlatList>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    destinationName: {
        fontSize: 15,
        color: 'white',
    },
    destinationContainer: {
        backgroundColor: '#781cff',
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
})