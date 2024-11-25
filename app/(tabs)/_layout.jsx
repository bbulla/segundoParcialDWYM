import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from 'expo-router';
import index from './index'
import Detalles from '../Detalles'
import Nuevo from './Nuevo'
const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");


const Tab = createBottomTabNavigator();
export default function App() {

    return (
        <Tabs

        >
            <Tab.Screen
                name="Destinos"
                component={index}
            />
            <Tab.Screen
                name="Detalles"
                component={Detalles}
            />
            <Tab.Screen
                name="Agregar"
                component={Nuevo}
            />

        </Tabs>
    );
}