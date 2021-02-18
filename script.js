"use strict";

window.addEventListener("DOMContentLoaded", init);

let index = 3;

function init() {
  // set up the eventlistener
  document
    .querySelector("#colorpicker")
    .addEventListener("input", getColorInput);
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
  displayColorInfo(color, index);
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
  console(hex);
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
  //
  console.log(`RGB: ${r}, ${g}, ${b}`);
  //
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
  //
  console.log("hsl(%f,%f%,%f%)", h, s, l);
  //
  return { h, s, l };
}

// RGB TO CSS (NOT VERY IMPORTANT)
// function rgb2CSS(rgbObject) {
//   return `${​​rgb.r}​​, ${​​rgb.g}​​, ${​​rgb.b}​​`;
// }

//HSL TO RGB - MIGHT BE
function hsl2RGB(hsl) {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
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
    `#colorinfo${index} .colorbox`
  ).style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function calculateHarmony(baseColor) {
  console.log("Time for fun");
  const harmony = document.querySelector("#harmony").value;
  //onclick event
  //document.querySelector("harmony").addEventListener("click", value);

  if (harmony === "analogous") {
    console.log("Harmony is Analogous");
    let analog = showAnalogColors(baseColor);
    console.log(analog);
    //
  } else if (harmony === "monochromatic") {
    console.log("Harmony is Monochromatic");
    let mono = showMonoColors(baseColor);
    console.log(mono);
    //
  } else if (harmony === "triad") {
    console.log("Harmony is triad");
    let triad = showTriadColors(baseColor);
    console.log(triad);
    //
  } else if (harmony === "complementary") {
    console.log("Harmony is Complementary");
    let complem = showCompletColors(baseColor);
    console.log(complem);
    //
  } else if (harmony === "compound") {
    console.log("Harmony is Compound");
    let compound = showCompoundColors(baseColor);
    console.log(compound);
    //
  } else if (harmony === "shades") {
    console.log("Harmony shows shades");
    let shades = showShadesColors(baseColor);
    console.log(shades);
    //
  }
}

// displaying harmonies
function showAnalogColors(baseColor) {
  let ten = 10;
  let newH = baseColor.h + ten;
  let newS = baseColor.s;
  let newL = baseColor.l;
  //
  const analog_a = { h: newH, s: newS, l: newL };
  //
  newH = newH + ten;
  const analog_b = { h: newH, s: newS, l: newL };
  //
  newH = newH + ten;
  const analog_d = { h: newH, s: newS, l: newL };
  //
  newH = newH + ten;
  const analog_e = { h: newH, s: newS, l: newL };
  //
  hsl2RGB(analog_a, "a");
  hsl2RGB(analog_b, "b");
  hsl2RGB(baseColor, "c");
  hsl2RGB(analog_d, "d");
  hsl2RGB(analog_e, "e");
}

function showMonoColors(baseColor) {}

function showTriadColors(baseColor) {}

function showCompletColors(baseColor) {}

function showCompoundColors(baseColor) {}

function showShadesColors(baseColor) {}
