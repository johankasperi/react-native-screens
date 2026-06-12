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
        Tap a tagged box to push the same screen, zooming out of the tapped box.
      </Text>
      <ZoomTransitionSource transitionTag="red">
        <Pressable
          style={[styles.sourceBox, { backgroundColor: Colors.RedDark100 }]}
          onPress={() =>
            navigation.push('Detail', { zoomTransitionSourceTag: 'red' })
          }>
          <Text style={styles.boxLabel}>Red source</Text>
        </Pressable>
      </ZoomTransitionSource>
      <ZoomTransitionSource transitionTag="green">
        <Pressable
          style={[styles.sourceBox, { backgroundColor: Colors.GreenDark100 }]}
          onPress={() =>
            navigation.push('Detail', { zoomTransitionSourceTag: 'green' })
          }>
          <Text style={styles.boxLabel}>Green source</Text>
        </Pressable>
      </ZoomTransitionSource>
      {/* No zoomTransitionSourceTag: pushes with the default stack transition. */}
      <Pressable
        style={[styles.sourceBox, { backgroundColor: Colors.PurpleDark100 }]}
        onPress={() => navigation.push('Detail')}>
        <Text style={styles.boxLabel}>No zoom (default push)</Text>
      </Pressable>
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
      <Text style={styles.label}>
        Swipe down to zoom back, or use the button.
      </Text>
      <Button
        title="Go back"
        onPress={() => navigation.pop(navigation.routeKey)}
      />
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
    width: 120,
    height: 120,
    borderRadius: 16,
    marginVertical: 8,
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
