import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Home({ navigation }) {

  const [texto, setTexto] = useState('');
  const [indiceTexto, setIndiceTexto] = useState(0);
  const [frases, setFrases] = useState([
    'Olá!',
    'Muito obrigado por clicar no link, fico muito feliz!',
    'Você deve estar se perguntando o que está acontecendo.',
    'Bom, vou te explicar certinho.',
    'Você está recebendo um convite para um projeto pessoal meu.',
    'Apenas as pessoas selecionadas irão poder fazer parte dele no final.',
    'Você pode se inscrever e tentar a sorte.',
    'Mas antes, preciso dar algumas informações e avisos importantes.',
    'Primeiro: Esse projeto é muito importante para mim, por favor, só se inscreva se for aceitar o compromisso e participar até o fim.',
    'Tenha em mente que precisarei de disponibilidade total durante as madrugadas de sexta para sábado e sábado para domingo.',
    'Na hora do cadastro, coloque informações sérias, se não conseguir te indentificar, irei apenas ignorar',
    'Todas as informações que eu te pedir ficarão guardadas em um banco criptografado em cloud, então não se preocupe.',
    'Você receberá mais informações desse projetinho em breve.'
  ]);
  const { width, height } = useWindowSize();
  const largura = Math.floor(width / 2);
  const altura = Math.floor(height / 2);
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (indiceTexto < frases.length) {
      typingTimeout.current = setTimeout(() => {
        setTexto(frases[indiceTexto].slice(0, texto.length + 1));
        if (texto.length + 1 < frases[indiceTexto].length) {
          typingTimeout.current = setTimeout(() => {
            setTexto(frases[indiceTexto].slice(0, texto.length + 1));
          }, 40);
        }
      }, 50);
    }

    return () => clearTimeout(typingTimeout.current);
  }, [texto, indiceTexto]);


  function proximo() {
    if (texto.length < frases[indiceTexto].length) {
      setTexto(frases[indiceTexto]);
      clearTimeout(typingTimeout.current);
    } else if (indiceTexto < frases.length - 1) {
      setIndiceTexto(indiceTexto + 1);
      setTexto('');
    } else {
      navigation.navigate('Escolha')

    }
  }

  const smallSlideDown = {
    0: { translateY: -50 },
    0.5: { translateY: -45 },
    1: { translateY: 0 },
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 40, fontFamily: 'Calibri', height: altura, width: largura + 400, marginTop: '40vh' }}>
          {texto}
        </Text>
      </View>
      <Animatable.View style={{ backgroundColor: 'black', marginTop: -80 }} duration={2000} iterationCount="infinite" easing="ease-in-out" animation={smallSlideDown} direction="alternate">
        <TouchableOpacity style={styles.botao} onPress={() => proximo()}>
          <View />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  botao: {
    marginLeft: '90vw',
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    transform: [{ rotate: '90deg' }],
  },
  body: {
    backgroundColor: 'black'
  }
});
