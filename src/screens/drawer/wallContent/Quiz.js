import { View, Text, Image,StyleSheet } from 'react-native'

import React from 'react'

export default function Quiz() {
  return (
    <View style={styles.container}>
    <Image
      source={require('../../../assets/images/logo.jpeg')}
      style={{width: '90%', resizeMode: 'contain', margin: 30}}
    />
    
  </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  
  });
  