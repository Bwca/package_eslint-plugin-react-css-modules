import { noNonExistantCssClasses } from './lint-non-existant-css-classes/lint-non-existant-css-classes.rule';

module.exports = {
  rules: {
    'no-non-existant-classes': {
      create: noNonExistantCssClasses,
    },
  },
};
