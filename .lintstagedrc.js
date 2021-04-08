module.exports = {
  '*.+(ts|tsx)': [() => 'tsc -p . --noEmit'],
  '*.+(js|ts|tsx)': [
    'eslint',
    'yarn test --watchAll=false --bail --findRelatedTests',
  ],
  '*.+(json|js|ts|tsx)': ['prettier --write'],
  '*.css': 'stylelint',
};
