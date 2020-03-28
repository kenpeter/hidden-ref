import React, { useState } from "react";
import Menu from "./Menu";

const getColor = index => {
  if (index === 0) return "blue";
  else if (index === 1) return "green";
  else if (index === 2) return "red";
};

function App() {
  // items
  const items = ["item0", "item1", "item2"];

  // state: show hide
  const [currIndex, setCurrIndex] = useState(-1);

  // close menu, set index -1
  const closeMenu = () => {
    setCurrIndex(-1);
  };

  // same, set not same
  const toggleMenu = index => {
    //test
    console.log("toggleMenu", "index", index, "currIndex", currIndex);

    // toggle
    if (index !== currIndex) setCurrIndex(index);
    else setCurrIndex(-1);
  };

  const shouldShowMenu = index => {
    //test
    console.log(
      "shouldShowMenu",
      "index",
      index,
      "currIndex",
      currIndex,
      "index === currIndex",
      index === currIndex
    );
    return index === currIndex;
  };

  return (
    <div className="App">
      {items.map((item, index) => {
        // loop items
        return (
          <div
            key={index}
            style={{
              backgroundColor: getColor(index),
              height: "100px",
              width: "200px"
            }}
          >
            <Menu
              index={index}
              isShowMenu={shouldShowMenu(index)}
              closeMenu={closeMenu}
              toggleMenu={toggleMenu}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
