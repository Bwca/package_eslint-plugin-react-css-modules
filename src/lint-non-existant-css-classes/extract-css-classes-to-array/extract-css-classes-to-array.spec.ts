import { extractCssClassesToArray } from './extract-css-classes-to-array.function';

describe(`${extractCssClassesToArray.name} tests`, () => {
  it('should return an array of unique css names', () => {
    // Arrange
    const css = '.one .two{} .one > .three{} .three + .three{}';
    const expectedClasses = ['.one', '.two', '.three'];

    // Act
    const classes = extractCssClassesToArray(css) as string[];
    const isEveryExpectedClassPresent = expectedClasses.every((i) => classes.includes(i));

    // Assert
    expect(isEveryExpectedClassPresent).toBeTruthy();
    expect(classes.length).toEqual(expectedClasses.length);
  });

  it('should npt mistake float values for classes', () => {
    // Arrange
    const css = getParsedCssWithFloats();
    const expectedClasses = ['.canvas', '.answer-container', '.answer-portal', '.ball', '.is-shaking', '.is-visible', '.answer'];

    // Act
    const classes = extractCssClassesToArray(css) as string[];
    const isEveryExpectedClassPresent = expectedClasses.every((i) => classes.includes(i));

    // Assert
    expect(isEveryExpectedClassPresent).toBeTruthy();
    expect(classes.length).toEqual(expectedClasses.length);
  });
});

function getParsedCssWithFloats(): string {
  return 'section.canvas .answer-container, section.canvas .answer-portal, section.canvas .ball, section.canvas {  display: flex;  justify-content: center;  align-items: center;}section.canvas {  height: 100%;  width: 100%;  background-color: #333;}section.canvas .ball {  background-color: black;  border-radius: 50%;  background-image: radial-gradient(farthest-corner at 40px 40px, #fff 0%, #000 45%);  z-index: 1;  position: relative;  box-shadow: 45px 25px 30px #111111;}section.canvas .ball.is-shaking {  animation: shake 0.5s;  animation-iteration-count: infinite;}@keyframes shake {  0% {    transform: translate(1px, 1px) rotate(0deg);  }  10% {    transform: translate(-1px, -2px) rotate(-1deg);  }  20% {    transform: translate(-3px, 0px) rotate(1deg);  }  30% {    transform: translate(3px, 2px) rotate(0deg);  }  40% {    transform: translate(1px, -1px) rotate(1deg);  }  50% {    transform: translate(-1px, 2px) rotate(-1deg);  }  60% {    transform: translate(-3px, 1px) rotate(0deg);  }  70% {    transform: translate(3px, 1px) rotate(-1deg);  }  80% {    transform: translate(-1px, -1px) rotate(1deg);  }  90% {    transform: translate(1px, 2px) rotate(0deg);  }  100% {    transform: translate(1px, -2px) rotate(-1deg);  }}@media screen and (max-width: 900px) {  section.canvas .ball {    height: 75vw;    width: 75vw;  }}@media screen and (min-width: 900px) {  section.canvas .ball {    height: 45vw;    width: 45vw;  }}section.canvas .answer-portal {  height: 50%;  width: 50%;  background-color: black;  border-radius: 50%;  box-shadow: 5px 5px 15px grey;  overflow: hidden;  box-sizing: border-box;  padding: 10%;}section.canvas .answer-container {  height: 100%;  width: 100%;  background-image: radial-gradient(farthest-corner at 40px 40px, #333 0%, #000 85%);  background-color: #808080;  border-radius: 5px;  transition: all 1s ease-in-out;  opacity: 0;  transform: scale(0.9);}section.canvas .answer-container.is-visible {  opacity: 1;  transform: scale(1);}section.canvas .answer {  text-align: center;  font-family: sans-serif;  box-sizing: border-box;  text-transform: uppercase;  padding: 5px;  font-size: 18px;  font-weight: bold;  color: #aaaaaa;  user-select: none;}@media screen and (max-width: 900px) {  section.canvas .answer {    font-size: 14px;  }}';
}
