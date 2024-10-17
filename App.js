import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Cadastro from './Cadastro';
import Escolha from './Escolha';
import Desistir from './Desistir';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Cadastro" options={{ headerShown: false }} component={Cadastro} />
        <Stack.Screen name="Escolha" options={{ headerShown: false }} component={Escolha} />
        <Stack.Screen name="Desistir" options={{ headerShown: false }} component={Desistir} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
