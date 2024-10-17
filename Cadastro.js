import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Animated } from 'react-native';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { Database } from './firebaseConfig';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [displayText, setDisplayText] = useState('');
  const [showForm, setShowForm] = useState(true);
  const typingTimeout = useRef(null);


  useEffect(() => {
    typeText("Por favor, faça o seu cadastro");
  }, []);

  const typeText = (text) => {
    let index = 0;
    setDisplayText(''); // Limpa o texto anterior

    const typingEffect = () => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
        typingTimeout.current = setTimeout(typingEffect, 50);
      } else {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    };

    typingEffect();
  };

  async function CadastroBD() {
    const bd = collection(Database, "BD");
    const respostaBD = await getDocs(bd);
    const tamanho = respostaBD.size + 1;
    console.log('aaa', tamanho);
    await setDoc(doc(Database, "BD", tamanho.toString()), {
      Nome: nome,
      Email: email
    });
  }

  function handleCadastro() {
    CadastroBD();
    setShowForm(false); // Esconde o formulário
    Animated.timing(fadeAnim, {
      toValue: 0, // Faz o formulário desaparecer com fade
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
       typeText("Obrigada por se inscrever, fique esperto no seu email"); // Inicia o novo texto
    });
    
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: '8%' }}>
        <Text style={{ color: 'white', fontFamily: 'calibri', fontSize: 40 }}>{displayText}</Text>
      </View>
      {showForm && ( // Renderiza o formulário apenas se showForm for true
        <Animated.View style={[styles.box, { opacity: fadeAnim }]}>
          <TextInput
            onChangeText={setNome}
            value={nome}
            placeholder="INSIRA SEU NOME"
            style={styles.inpute}
          />
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="INSIRA SEU EMAIL"
            style={styles.inpute}
          />
          <TouchableOpacity
            onPress={handleCadastro}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '15vw', height: '5vh', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'calibri', fontSize: 20 }}>CADASTRAR</Text>
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
  },
  inpute: {
    fontSize: 20,
    fontFamily: 'calibri',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0)',
    marginBottom: 10,
  },
  box: {
    backgroundColor: 'white',
    width: '20vw',
    height: '40vh',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
