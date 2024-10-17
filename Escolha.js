import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function Escolha({ navigation }) {
 const [text, setText] = useState('');
 const [textVisible, setTextVisible] = useState(false);
 const [buttonsVisible, setButtonsVisible] = useState(false);
 const buttonsAnimated = useRef(new Animated.Value(0)).current;
 const fullText = "Agora faça sua escolha, você quer participar ou desistir?";
 let index = 0;


 useEffect(() => {

     const timeout = setTimeout(() => {
         setTextVisible(true)
         const interval = setInterval(() => {
             setText(fullText.slice(0, index));
             index++;
             if (index > fullText.length) {
                 clearInterval(interval);

                 setButtonsVisible(true);
                 Animated.timing(buttonsAnimated, {
                     toValue: 1,
                     duration: 500,
                     useNativeDriver: true,
                 }).start();
             }

         }, 50);

         return () => clearInterval(interval);
     }, 500);

     return () => clearTimeout(timeout)

 }, []);

 function Desistir(){
    navigation.navigate('Desistir')

 }

 function Participar(){
    navigation.navigate('Cadastro')
 }


 return (
     <View style={styles.container}>
         <View>
             <Text
                 style={[
                     styles.text,

                 ]}
             >
                 {textVisible && text}

             </Text>
         </View>
         {buttonsVisible && (
             <Animated.View style={{
                 alignItems: 'center',
                 flexDirection: 'row',
                 justifyContent: 'space-evenly',
                 width: '100vw',
                 height: '20vh',
                 opacity: buttonsAnimated,
                 transform: [{
                     translateY: buttonsAnimated.interpolate({
                         inputRange: [0, 1],
                         outputRange: [20, 0]
                     })
                 }]
             }}>
                 <TouchableOpacity onPress={() => Participar()} style={{ backgroundColor: '#A70000', width: '20vw', height: '10vh', justifyContent: 'center', alignItems: 'center', borderRadius: 60 }}>
                     <Text style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Calibri', fontSize: 30 }}>PARTICIPAR</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => Desistir()} style={{ backgroundColor: '#A70000', width: '20vw', height: '10vh', justifyContent: 'center', alignItems: 'center', borderRadius: 60 }}>
                     <Text style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Calibri', fontSize: 30 }}>DESISTIR</Text>
                 </TouchableOpacity>
             </Animated.View>
         )}
     </View>
 );
}

const styles = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor: 'black',
     alignItems: 'center',
     justifyContent: 'center'
 },
 text: {
     color: 'white',
     fontFamily: 'calibri',
     fontSize: 40,
     flex: 0.5,
     marginBottom: '10vh',


 }
});
