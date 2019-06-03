module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  globals: {
    document: true
  },
  env: {
    browser: true
  },
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "object-curly-spacing": ["error", "never"],
    "quotes": ["error", "single"],
    "import/first": "off",
    "no-prototype-builtins": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off"
  },
  overrides: [{
    files: [
      "src/**/*.test.js",
      "src/**/*.test.jsx",
      "src/**/__mocks__/*.js",
      "src/**/__mocks__/*.jsx"
    ],
    globals: {
      document: true,
      jest: true
    },
    env: {
      jest: true,
      browser: true
    },
    plugins: ["jest"],
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }, {
    files: [
      "src/**/*.stories.jsx",
      "src/utils/stories.jsx"
    ],
    rules: {
      "import/no-extraneous-dependencies": "off"
    }
  }]
}

