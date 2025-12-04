import { CommonActions, NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { ScrollView, Text, StyleSheet, Button } from 'react-native'

const styles = StyleSheet.create({
  scrollview: {
    borderWidth: 2,
    borderColor: 'blue'
  },
  contentContainer: {
    padding: 16
  }
});

const FormsheetScreen = () => {
  const navigation = useNavigation()
  return <ScrollView style={[styles.scrollview]} contentContainerStyle={styles.contentContainer}>
    <Text>Formsheet with scrollview</Text>
    <Button title="Go to Regular screen" onPress={() => {
            navigation.dispatch(state => {
        // Remove the Formsheet screen from the stack
        const routes = state.routes.filter(r => r.name !== 'Formsheet');
        // Add the Regular screen
        routes.push({ name: 'Regular', params: {} });
        
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }} />
  </ScrollView>
}

const RegularScreen = () => {
  return <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
    <Text>Regular screen with scrollview</Text>
  </ScrollView>
}

const HomeScreen = () => {
  const navigation = useNavigation()
  return <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
    <Text>Home Screen</Text>
    <Button title="Open formsheet" onPress={() => {
      navigation.navigate('Formsheet')
    }} />
  </ScrollView>
}

const Stack = createNativeStackNavigator()

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formsheet" component={FormsheetScreen} options={{presentation: "formSheet", sheetAllowedDetents: "fitToContents", headerShown: false}} />
        <Stack.Screen name="Regular" component={RegularScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;