module.exports = {
  '*.+(js|ts|tsx)': [
    'eslint',
    () => 'tsc -p . --noEmit',
    'jest --bail --findRelatedTests',
  ],
  '*.+(json|js|ts|tsx)': ['prettier --write'],
  '*.css': 'stylelint',
};
