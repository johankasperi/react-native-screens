import type { ScenarioDescription } from '@apps/tests/shared/helpers';

export const scenarioDescription: ScenarioDescription = {
  name: 'Zoom transition',
  key: 'test-zoom-transition-ios',
  details: 'Push zooms out of a registered ZoomTransitionSource view (iOS 18+)',
  platforms: ['ios'],
  e2eCoverage: 'tbd',
  smokeTest: false,
};
