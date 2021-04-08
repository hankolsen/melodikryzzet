module.exports = {
  '*.+(ts|tsx)': [() => 'tsc -p . --noEmit'],
  '*.+(js|ts|tsx)': [
    'eslint',
    'test:nowatch --bail --findRelatedTests',
  ],
  '*.+(json|js|ts|tsx)': ['prettier --write'],
  '*.css': 'stylelint',
};
