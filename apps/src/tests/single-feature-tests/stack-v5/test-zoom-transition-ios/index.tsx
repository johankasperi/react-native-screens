import React from 'react';
import { scenarioDescription } from './scenario-description';
import { createScenario } from '@apps/tests/shared/helpers';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  StackContainer,
  useStackNavigationContext,
} from '@apps/shared/gamma/containers/stack';
import { CenteredLayoutView } from '@apps/shared/CenteredLayoutView';
import { Colors } from '@apps/shared/styling';
import { ZoomTransitionSource } from 'react-native-screens/experimental';

export function App() {
  return <StackSetup />;
}

function StackSetup() {
  return (
    <StackContainer
      routeConfigs={[
        {
          name: 'Home',
          Component: HomeScreen,
          options: {},
        },
        {
          name: 'Detail',
          Component: DetailScreen,
          options: {},
        },
      ]}
    />
  );
}

function HomeScreen() {
  const navigation = useStackNavigationContext();

  return (
    <CenteredLayoutView style={{ backgroundColor: Colors.BlueLight40 }}>
      <Text style={styles.label}>
        Tap the box to push a screen that zooms out of it.
      </Text>
      <ZoomTransitionSource>
        <Pressable
          style={styles.sourceBox}
          onPress={() => navigation.push('Detail')}>
          <Text style={styles.boxLabel}>Zoom source</Text>
        </Pressable>
      </ZoomTransitionSource>
    </CenteredLayoutView>
  );
}

function DetailScreen() {
  const navigation = useStackNavigationContext();

  // NOTE: Do not make the whole screen pop on press. The zoom transition adds a
  // swipe-down interactive dismiss; a full-screen `onPress` would also fire on
  // that gesture, popping the same screen twice (native dismiss + JS pop).
  return (
    <View style={[styles.detail, { backgroundColor: Colors.GreenLight100 }]}>
      <Text style={styles.label}>Detail</Text>
      <Text style={styles.label}>Swipe down to zoom back, or use the button.</Text>
      <Button title="Go back" onPress={() => navigation.pop(navigation.routeKey)} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 12,
  },
  sourceBox: {
    width: 140,
    height: 140,
    borderRadius: 16,
    backgroundColor: Colors.RedDark100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createScenario(App, scenarioDescription);
