/**
 * @file lint-staged.config.js
 * @description
 * Configuration file for lint-staged, a tool to run linters on pre-committed files in Git.
 * This configuration specifies the tasks to run on staged files, including linting and formatting,
 * to ensure code quality and consistency before commits.
 */

module.exports = {
  '*.{js,jsx, ts, tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json, yaml}': ['prettier --write']
}
