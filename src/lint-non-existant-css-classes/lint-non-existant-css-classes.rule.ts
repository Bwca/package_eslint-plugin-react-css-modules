import { dirname, resolve } from 'path';

// eslint-disable-next-line no-unused-vars
import { Rule } from 'eslint';
// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { ImportDeclaration, Identifier, Literal } from 'estree';

import { extractCssClassesToArray } from './extract-css-classes-to-array/extract-css-classes-to-array.function';
import { extractCssStringFromFile } from './extract-css-string-from-file/extract-css-string-from-file.function';
import { getReplacementRange } from './get-replacement-range/get-replacement-range.function';

export function noNonExistantCssClasses(context: Rule.RuleContext): Rule.RuleListener {
  const cssClassesMap = new Map<string, Map<string, boolean>>();

  return {
    ImportDeclaration(node) {
      const isModule = !!node.specifiers.length;
      if (!isModule) {
        return;
      }

      const nodeSource = String(node.source.value);
      const isStylesheetImport = /.+\.s?css/.test(nodeSource);

      if (isStylesheetImport) {
        const stylesheetPath = resolve(dirname(context.getFilename()), nodeSource);
        const css = extractCssStringFromFile(stylesheetPath) ?? '';

        const classes = extractCssClassesToArray(css);
        const classesMap = new Map<string, boolean>();
        classes.forEach((i) => classesMap.set(i.replace(/^\./, ''), true));

        const key = node.specifiers[0].local.name;
        cssClassesMap.set(key, classesMap);
      }
    },

    MemberExpression(node) {
      const name: string | undefined = (node.object as Identifier).name;
      const cssMap = cssClassesMap.get(name);

      if (!cssMap) {
        return;
      }
      const propertyName: string = ((node.property as Identifier).name || (node.property as Literal).value) as string;

      const isPropertyOkay = cssMap.has(propertyName);

      if (!isPropertyOkay) {
        context.report({
          node,
          message: `The class ${propertyName} does not exist.`,
          suggest: Array.from(cssMap.keys()).map((cssClass) => ({
            desc: `Replace non-existant ${propertyName} with ${cssClass}.`,
            fix: (fixer) => fixer.replaceTextRange(getReplacementRange(propertyName, node.property.range as [number, number]), cssClass),
          })),
        });
      }
    },
  };
}
