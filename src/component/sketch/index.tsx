import { Color } from "p5";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";

let data: any;
let url = [
  "202c39-283845-b8b08d-f2d492-f29559",
  "1f2041-4b3f72-ffc857-119da4-19647e",
  "2f4858-33658a-86bbd8-f6ae2d-f26419",
  "ffac81-ff928b-fec3a6-efe9ae-cdeac0",
  "f79256-fbd1a2-7dcfb6-00b2ca-1d4e89",
  "e27396-ea9ab2-efcfe3-eaf2d7-b3dee2",
  "966b9d-c98686-f2b880-fff4ec-e7cfbc",
  "50514f-f25f5c-ffe066-247ba0-70c1b3",
  "177e89-084c61-db3a34-ffc857-323031",
  "390099-9e0059-ff0054-ff5400-ffbd00",
  "0d3b66-faf0ca-f4d35e-ee964b-f95738",
  "780000-c1121f-fdf0d5-003049-669bbc",
  "eae4e9-fff1e6-fde2e4-fad2e1-e2ece9-bee1e6-f0efeb-dfe7fd-cddafd",
  "f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590",
  "555b6e-89b0ae-bee3db-faf9f9-ffd6ba",
  "9b5de5-f15bb5-fee440-00bbf9-00f5d4",
  "ef476f-ffd166-06d6a0-118ab2-073b4c",
  "006466-065a60-0b525b-144552-1b3a4b-212f45-272640-312244-3e1f47-4d194d",
  "f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1",
  "f6bd60-f7ede2-f5cac3-84a59d-f28482",
  "0081a7-00afb9-fdfcdc-fed9b7-f07167",
  "f4f1de-e07a5f-3d405b-81b29a-f2cc8f",
  "50514f-f25f5c-ffe066-247ba0-70c1b3",
  "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226",
  "ef476f-ffd166-06d6a0-118ab2-073b4c",
  "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a",
  "e63946-f1faee-a8dadc-457b9d-1d3557",
  "264653-2a9d8f-e9c46a-f4a261-e76f51",
];
let palette: any;

const sketch: Sketch = (p5) => {
  p5.preload = () => {
    data = p5.loadTable("./logo.csv", "csv");
  };
  p5.setup = () => {
    p5.createCanvas(860, 78);
    p5.colorMode("HSB", 360, 100, 100, 100);
    p5.angleMode("degrees");
    p5.strokeJoin("round");
    palette = p5.shuffle(createPalette(p5.random(url)));
    p5.frameRate(5);
  };

  p5.draw = () => {
    p5.randomSeed(p5.frameCount / 15);
    p5.push();
    // p5.translate(70, 150);
    p5.textFont("mono-space");
    let size = 15;
    for (let i = 0; i < data.getRowCount(); i++) {
      for (let j = 0; j < data.getColumnCount(); j++) {
        let shape = data.getString(i, j);
        if (shape != "," && shape.length > 0) {
          drawShape(
            shape,
            j * size + size / 2,
            i * size + size / 2,
            size,
            p5.shuffle(palette.concat())
          );
        }
      }
    }
    p5.pop();
  };

  function drawShape(
    type: any,
    x: number,
    y: number,
    d: number,
    colors: Color[]
  ) {
    let repeatNum = p5.int(p5.random(colors.length / 2, colors.length));
    let angle = 0;
    let shape;
    if (type == "◤") {
      angle = 0;
    } else if (type == "◥") {
      angle = 90;
    } else if (type == "◢") {
      angle = 180;
    } else if (type == "◣") {
      angle = 270;
    }
    let v;
    if (type == "◤" || type == "◥" || type == "◢" || type == "◣") {
      v = p5.int(p5.noise(x, y, p5.frameCount / 20) * 2);
      shape = ["arc", "triangle"][v];
    } else {
      v = p5.int(p5.noise(x, y, p5.frameCount / 20) * 3);
      shape = ["rect", "two_triangle", "circle"][v];
    }

    p5.push();
    p5.translate(x, y);
    p5.rotate(angle);
    if (shape == "arc" || shape == "triangle") {
      p5.translate(-d / 2, -d / 2);
    }
    let sclStep = p5.int(p5.random(1, 5));
    let n = 0;
    switch (shape) {
      case "arc":
        for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
          p5.push();
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.fill(colors[n++ % repeatNum]);
          p5.arc(0, 0, d * 2, d * 2, 0, 90, p5.PIE);
          p5.pop();
        }
        break;
      case "triangle":
        for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
          p5.push();
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.fill(colors[n++ % repeatNum]);
          p5.triangle(0, 0, d, 0, 0, d);
          p5.pop();
        }
        break;
      case "rect":
        for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
          p5.push();
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.rectMode("center");
          p5.fill(colors[n++ % repeatNum]);
          p5.rect(0, 0, d, d);
          p5.pop();
        }
        break;
      case "two_triangle":
        for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
          p5.push();
          p5.translate(0, -d / 2);
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.fill(colors[n++ % repeatNum]);
          p5.triangle(-d / 2, 0, d / 2, 0, 0, d / 2);
          p5.pop();
          p5.push();
          p5.translate(0, d / 2);
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.fill(colors[n++ % repeatNum]);
          p5.triangle(-d / 2, 0, d / 2, 0, 0, -d / 2);
          p5.pop();
        }
        break;
      case "circle":
        for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
          p5.push();
          p5.scale(scl);
          p5.strokeWeight(1 / scl);
          p5.fill(colors[n++ % repeatNum]);
          p5.circle(0, 0, d);
          p5.pop();
        }

        break;
    }
    p5.pop();
  }

  function createPalette(_url: any) {
    let slash_index = _url.lastIndexOf("/");
    let pallate_str = _url.slice(slash_index + 1);
    let arr = pallate_str.split("-");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = p5.color("#" + arr[i]);
    }
    return arr;
  }
};

export function LogoSketch() {
  return <ReactP5Wrapper sketch={sketch} />;
}
