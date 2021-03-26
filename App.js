import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bem Vindo</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
        <Text style={styles.textButton}>Adicionar Contato</Text>
      </TouchableOpacity>
    </View>
  )
}

const ContactScreen = () => {

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [id, setId] = useState(0);
  const [schedule, setSchedule] = useState([])

  const handleButtonclick = () => {
    setId(id + 1) 
    setSchedule((currentState) => [...currentState, { id, name, phoneNumber }])
  }

  const handleRemoveItem = (id) => {
    setSchedule(
      schedule.slice().filter((item) => item.id !== id)
    )
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemList} onLongPress={() => handleRemoveItem(item.id)}>
      <Text style={styles.textItem}>{item.name.toUpperCase()}</Text> 
      <Text style={styles.textItem}>{item.phoneNumber}</Text> 
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h1}>Cadastro de contato</Text>

        <TextInput
          style={styles.input}
          placeholder='Nome'
          onChangeText={text => setName(text)} 
          value={name}
        />

        <TextInput style={styles.input}
          placeholder='Telefone'
          keyboardType={'numeric'} 
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />

        <TouchableOpacity style={styles.button} onPress={handleButtonclick}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={schedule}
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '95%', marginVertical: 14 }} 
        showsVerticalScrollIndicator={false} 
      />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  form: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 6
  },
  input: {
    height: 40,
    width: '95%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 18
  },
  button: {
    height: 40,
    width: '95%',
    margin: 12,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white'
  },
  itemList: {
    width: '100%',
    padding: 16,
    marginTop: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-around' 

  },
  textItem: {
    fontSize: 18,
    fontWeight: '600',
  }
});