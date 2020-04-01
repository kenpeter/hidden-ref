import React, { useState } from "react";
import Menu from "./Menu";

const getColor = index => {
  return "#ccc";
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
    // toggle
    if (index !== currIndex) setCurrIndex(index);
    else setCurrIndex(-1);
  };

  const shouldShowMenu = index => {
    return index === currIndex;
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    backgroundColor: getColor(index)
                  }}
                >
                  <a href="#">file {item}</a>
                </td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
