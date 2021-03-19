import { readFileSync } from 'fs';

import { renderSync } from 'sass';

export function extractCssStringFromFile(filePath: string): string {
  /** In case of SCSS file, parse it first. */

  if (/\.scss$/.test(filePath)) {
    const scssRenderResult = renderSync({
      file: filePath,
    });
    return scssRenderResult.css.toString();
  }
  /** In case of css file, just read the contents. */
  if (/\.css$/.test(filePath)) {
    return readFileSync(filePath, 'utf8');
  }

  throw 'Unsupported file format';
}
