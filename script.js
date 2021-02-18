"use strict";

init();

function init() {
  // set up the eventlistener
  document.querySelector("#colorpicker").addEventListener("input", getColorInput);
}

function getColorInput(event) {
  //
  console.log("getColorInput");
  //
  const color = event.target.value;
  ///call select
  selectColor(color);
}

function selectColor(color) {
  //
  console.log(color);
  //
  const rgb = hex2RGB(color);
  const hsl = rgb2HSL(rgb);
  const baseColor = rgb2HSL(hex2RGB(color));
//calculate Harmony
  calculateHarmony(baseColor);
}

// called from the eventlistener
function displayColorInfo(color, index) {
  // get the code for selected color
  const rgb = hex2RGB(color);
  const hsl = rgb2HSL(rgb);

  // display those different colors ...
  showHexColor(color, index);
  showRbgColor(rgb, index);
  showHslColor(hsl, index);
  showColorBox(rgb, index);
}

function rgb2Hex(rgbObject) {
  //
  console.log("Show HEX");
  //
  const hexR = rgbObject.r.toString(16).padStart(2, "0");
  const hexG = rgbObject.g.toString(16).padStart(2, "0");
  const hexB = rgbObject.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;

  return hex;
}

function hex2RGB(color, index) {
  //
  console.log("Show RGB please");
  //
  let r = color.substring(1, 3);
  let g = color.substring(3, 5);
  let b = color.substring(5, 7);
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return { r, g, b };
}

function rgb2HSL(rgbObject) {
  //
  console.log("SHOW HSL");
  //
  const r = rgbObject.r / 255;
  const g = rgbObject.g / 255;
  const b = rgbObject.b / 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  return { h, s, l };
}

//functions showing the code 

function showHexColor(hex, index) {
  document.querySelector(`#colorinfo${index} .hex .value`).textContent = hex;
}

function showRbgColor(rgb, index) {
  document.querySelector(
    `#colorinfo${index} .rgb .value`
  ).textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHslColor(hsl, index) {
  document.querySelector(
    `#colorinfo${index} .hsl .value`
  ).textContent = `${hsl.h}, ${hsl.s}, ${hsl.l}`;
}

function showColorBox(rgb, index) {
  document.querySelector(
    `#colorinfo${index} .colorbox3`
  ).style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function calculateHarmony(baseColor) {

}
