module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `eslint --fix ${filenames.join(' ')}`,
    `tsc --noEmit --project tsconfig.json`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,

  // Prettify only CSS files
  '**/*.(css|scss)': (filenames) => `prettier --write ${filenames.join(' ')}`,
}