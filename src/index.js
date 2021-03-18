const { readFileSync } = require('fs');
const { dirname, resolve } = require('path');

const { renderSync } = require('sass');

module.exports = {
  rules: {
    'no-template-literals': {
      create: function (context) {
        return {
          TemplateLiteral(node) {
            context.report(node, 'Do not use template literals');
          },
        };
      },
    },
    'no-css': {
      create: (context) => {
        return {
          ImportDeclaration(node) {
            if (/.+\.s?css/.test(node.source.value)) {
              const stylesheetPath = resolve(dirname(context.getFilename()), node.source.value);
              const message = extractCssStringFromFile(stylesheetPath);
              context.report(node, message);
            }
          },
        };
      },
    },
  },
};

function extractCssStringFromFile(filePath) {
  /** In case of SCSS file, parse it first. */

  if (/\.scss$/.test(filePath)) {
    try {
      const scssRenderResult = renderSync({
        file: filePath,
      });
      return scssRenderResult.css.toString();
    } catch (e) {
      return;
    }
  }
  /** In case of css file, just read the contents. */
  if (/\.css$/.test(filePath)) {
    try {
      return readFileSync(filePath, 'utf8');
    } catch (e) {
      return;
    }
  }
}
