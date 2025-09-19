import React from 'react';
import Golondrina from '../components/Golondrina';
import ProgresBar from '../components/ProgresBar';
import { View, StyleSheet  } from 'react-native';
import {useTheme} from "../context/ThemeContext";

export default function LoadingScreen() {
  const {theme} = useTheme();
  const frase = 'Volando hacia\nnuevas oportunidades';
  return (
    <View  style={[styles.container, {backgroundColor: theme.colors.background.primary}]}>
      <View style={{justifyContent:'center', alignItems:'center'}} >
        {/* Header (Logo centrado arriba) */}
        <View style={{justifyContent:'center', alignItems:'center', paddingBottom:20}}>
          <Golondrina title={frase} />
        </View>
        <View style={{justifyContent:'center', alignItems:'center', paddingTop:5}}>
          <ProgresBar />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});