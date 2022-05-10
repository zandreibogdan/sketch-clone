import "./App.css";
import { useState } from "react";

function App() {
  let mouseDown = false;
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);

  const [clear, setClear] = useState(true);
  const [currColor, setCurrColor] = useState("#585555");
  const [currSize, setCurrSize] = useState(16);
  const [color, setColor] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "color" },
      { id: 2, name: "rainbow" },
      { id: 3, name: "eraser" },
    ],
  });

  const gridElements = [...Array(currSize * currSize)].map((_, i) => {
    return (
      <div
        className="grid-element"
        onMouseOver={changeColor}
        onMouseDown={changeColor}
        id={i}
        key={i}
      ></div>
    );
  });

  function toggleActive(index) {
    setColor({ ...color, activeObject: color.objects[index] });
  }

  function toggleActiveStyles(index) {
    if (color.objects[index] === color.activeObject) {
      return "active";
    } else {
      return "";
    }
  }

  const objs = color.objects.map((elements, index) => {
    return (
      <button
        key={index}
        className={toggleActiveStyles(index)}
        onClick={() => toggleActive(index)}
      >
        {color.objects[index].name}
      </button>
    );
  });

  function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (color.activeObject.name === "rainbow") {
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (color.activeObject.name === "color") {
      e.target.style.backgroundColor = currColor;
    } else if (color.activeObject.name === "eraser") {
      e.target.style.backgroundColor = "#fefefe";
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="title" style={{ color: `${currColor}` }}>
          etch a sketch
        </h1>
      </header>
      <main className="main">
        <div className="settings">
          <input
            id="colorPicker"
            type="color"
            defaultValue={currColor}
            onChange={(e) => setCurrColor(e.target.value)}
          />
          {objs}
          <button id="clearBtn" onClick={() => setClear((prev) => !prev)}>
            {clear ? "clear" : "reset your grid"}
          </button>
          <div id="sizeValue" className="size-value">
            {`${currSize} x ${currSize}`}
          </div>
          <input
            id="sizeSlider"
            type="range"
            min="1"
            max="64"
            value={currSize}
            onChange={(e) => setCurrSize(e.target.value)}
          />
        </div>
        <div
          id="grid"
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${currSize}, 1fr)`,
            gridTemplateRows: `repeat(${currSize}, 1fr)`,
          }}
        >
          {clear ? gridElements : ""}
        </div>
      </main>
    </div>
  );
}

export default App;
