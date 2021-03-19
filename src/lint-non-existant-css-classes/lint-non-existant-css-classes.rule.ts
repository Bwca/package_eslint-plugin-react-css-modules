import { dirname, resolve } from 'path';

// eslint-disable-next-line no-unused-vars
import { Rule } from 'eslint';

import { extractCssStringFromFile } from './extract-css-string-from-file/extract-css-string-from-file.function';

export function noNonExistantCssClasses(context: Rule.RuleContext): Rule.RuleListener {
  return {
    ImportDeclaration(node) {
      const nodeSource = String(node.source.value);
      const isImportStylesheet = /.+\.s?css/.test(nodeSource);

      if (isImportStylesheet) {
        const stylesheetPath = resolve(dirname(context.getFilename()), nodeSource);
        const css = extractCssStringFromFile(stylesheetPath);
        context.report({
          node,
          message: css,
        });
      }
    },
  };
}
