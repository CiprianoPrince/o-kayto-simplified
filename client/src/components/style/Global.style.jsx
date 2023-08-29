import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --fs--2: clamp(0.69rem, calc(0.66rem + 0.18vw), 0.80rem);
  --fs--1: clamp(0.83rem, calc(0.78rem + 0.29vw), 1.00rem);
  --fs-0: clamp(1.00rem, calc(0.91rem + 0.43vw), 1.25rem);
  --fs-1: clamp(1.20rem, calc(1.07rem + 0.63vw), 1.56rem);
  --fs-2: clamp(1.44rem, calc(1.26rem + 0.89vw), 1.95rem);
  --fs-3: clamp(1.73rem, calc(1.48rem + 1.24vw), 2.44rem);
  --fs-4: clamp(2.07rem, calc(1.73rem + 1.70vw), 3.05rem);
  --fs-5: clamp(2.18rem, calc(1.61rem + 2.85vw), 3.82rem);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

body {
  position: relative;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
svg {
  display: block;
  max-width: 100%;
}

.bgm-fs--2 {
font-size: var(--bgm-fs--2) !important;
}

.bgm-fs--1 {
font-size: var(--bgm-fs--1) !important;
}

.bgm-fs-0 {
font-size: var(--bgm-fs-0) !important;
}

.bgm-fs-1 {
font-size: var(--bgm-fs-1) !important;
}

.bgm-fs-2 {
font-size: var(--bgm-fs-2) !important;
}

.bgm-fs-3 {
font-size: var(--bgm-fs-3) !important;
}

.bgm-fs-4 {
font-size: var(--bgm-fs-4) !important;
}

.bgm-fs-5 {
font-size: var(--bgm-fs-5) !important;
}
`;

export default GlobalStyle;
