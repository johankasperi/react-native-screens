import { CommonActions, NavigationContainer, useLinkTo, useNavigation } from '@react-navigation/native'
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
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  return <ScrollView style={[styles.scrollview]} contentContainerStyle={styles.contentContainer}>
    <Text>Formsheet with scrollview</Text>
    <Button title="Go to Regular screen" onPress={() => {
      linkTo('/regular')
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
const NestedStack = createNativeStackNavigator()

const NestedStackScreen = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NestedStack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Regular" component={RegularScreen} />
    </NestedStack.Navigator>
  )
}


const Stack = createNativeStackNavigator()

const linking = {
  prefixes: ["test-formsheet-scrollview://"],
  config: {
    screens: {
      Formsheet: 'formsheet',
      NestedStack: {
        screens: {
          Regular: {
            exact: true,
            path: 'regular'
          },
          Home: ''
        }
      }

    }
  }
}

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="NestedStack">
        <Stack.Screen name="NestedStack" component={NestedStackScreen} options={{headerShown: false}} />
        <Stack.Screen name="Formsheet" component={FormsheetScreen} options={{presentation: "formSheet", sheetAllowedDetents: "fitToContents", headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;