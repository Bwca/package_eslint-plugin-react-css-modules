# eslint-plugin-react-css-modules

## Well, what is it?

The plugin's goal is to warn you when you import a css/scss module and then attempt to use a class which does not exist there. Pretty simple, it addition it will provide a list of all available classes from that module in hints, so that you can fix the problem.

## Installation

Obviously requires `eslint` to run, since it is merely its plugin.
Install with npm:

```bash
npm i -D eslint-plugin-react-css-module-hints
```

or yarn:

```bash
yarn add -D eslint-plugin-react-css-module-hints
```

Then plug it in in your eslint configuration file, i.e. in `.eslintrc.json`:

```json
{
  "plugins": ["react-css-module-hints"],
  "rules": {
    "react-css-module-hints/no-non-existant-classes": "warn"
  }
}
```

That's it, you're ready to go.
