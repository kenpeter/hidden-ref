import React, { useEffect, useState, useRef } from "react";
import { eventPath } from "./eventPath.js";

function useClickOutside(ref, callback) {
  const handleClick = event => {
    const target = event.target.shadowRoot ? eventPath(event)[0] : event.target;

    //test
    console.log(
      "ref",
      ref,
      "ref.current.contains(target)",
      ref.current.contains(target)
    );

    if (!ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  });

  return { handleClick };
}

function App() {
  const items = ["item0", "item1", "item2"];
  const menuRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  // pass set state
  useClickOutside(menuRef, () => setIsShow(false));

  return (
    <div className="App">
      {items.map((item, index) => {
        return (
          <div
            ref={menuRef}
            style={{ backgroundColor: "#ccc", height: "100px", width: "200px" }}
          >
            <button
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              click
            </button>
            {isShow && <div>menu</div>}
          </div>
        );
      })}
    </div>
  );
}

export default App;
