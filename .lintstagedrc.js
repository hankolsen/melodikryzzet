module.exports = {
  '*.+(ts|tsx)': [
    'eslint',
    () => 'tsc -p . --noEmit',
    'yarn test --watchAll=false --bail --findRelatedTests',
  ],
  '*.+(json|js|ts|tsx)': ['prettier --write'],
  '*.css': 'stylelint',
};
