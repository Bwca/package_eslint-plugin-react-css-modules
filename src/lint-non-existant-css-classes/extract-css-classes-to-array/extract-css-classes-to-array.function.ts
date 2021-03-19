export function extractCssClassesToArray(css: string): string[] {
  const classes: string[] = css.match(/(\.[a-z\d\-_]+)/gi) as string[];
  return classes.reduce((a: string[], b) => (a.includes(b) ? a : [...a, b]), []).filter((i) => !/\d+/.test(i));
}
