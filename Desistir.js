import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function Desistir({ navigation }) {
    const [text, setText] = useState('');
    const [textVisible, setTextVisible] = useState(false);
    const fullText = "Certo, eu entendo. Obrigada pela atenção. Você já pode sair da página";
    let index = 0;
   
   
    useEffect(() => {
   
        const timeout = setTimeout(() => {
            setTextVisible(true)
            const interval = setInterval(() => {
                setText(fullText.slice(0, index));
                index++;
                if (index > fullText.length) {
                    clearInterval(interval)
                }
   
            }, 50);
   
            return () => clearInterval(interval);
        }, 500);
   
        return () => clearTimeout(timeout)
   
    }, []);

    return (
        <View style={styles.container}>
             <Text style={[styles.text,]}>
                 {textVisible && text}
             </Text>
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
        marginBottom: '10vh',
   
   
    }
   });