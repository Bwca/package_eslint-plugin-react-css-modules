import { extractCssStringFromFile } from './extract-css-string-from-file.function';

describe(`${extractCssStringFromFile.name} tests for css extractor`, () => {
  it('should correctly extract css styles from scss stylesheet', async () => {
    // Arrange
    const filePath = __dirname + '/__test__/styles.scss';

    // Act
    const css = await extractCssStringFromFile(filePath);

    // Assert
    expect(css).toMatchSnapshot();
  });

  it('should correctly extract css styles from css stylesheet', async () => {
    // Arrange
    const filePath = __dirname + '/__test__/styles.css';

    // Act
    const css = await extractCssStringFromFile(filePath);

    // Assert
    expect(css).toMatchSnapshot();
  });
});
