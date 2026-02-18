module.exports = {
    preset: 'jest-expo',
  
    transformIgnorePatterns: [
      'node_modules/(?!(react-native' +
        '|@react-native' +
        '|expo' +
        '|expo-modules-core' +
        '|@expo' +
        '|@react-navigation' +
        '|@reduxjs' +
        '|redux' +
        '|immer' +
        ')/)',
    ],
  };
  