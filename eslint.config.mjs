import typescript from '@typescript-eslint/eslint-plugin';

export default [
  { ignores: ['dist/**', 'coverage/**'] },
  ...typescript.configs['flat/recommended'],
];
