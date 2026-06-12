import type { ScenarioDescription } from '@apps/tests/shared/helpers';

export const scenarioDescription: ScenarioDescription = {
  name: 'Zoom transition',
  key: 'test-zoom-transition-ios',
  details:
    'Push zooms out of the tapped ZoomTransitionSource, matched by tag among several sources on one screen; an untagged push uses the default transition (iOS 18+)',
  platforms: ['ios'],
  e2eCoverage: 'tbd',
  smokeTest: false,
};
