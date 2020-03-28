import React, { useRef, useEffect, useState } from "react";
import { eventPath } from "./eventPath.js";

function Menu({ index, isShowMenu, closeMenu, toggleMenu }) {
  // menu ref
  const menuRef = useRef(null);

  // if really click
  const handleClick = event => {
    //test
    console.log("handleClick");

    if (menuRef === null || menuRef.current === null) {
      console.log("menuRef null out");
      return;
    }

    // find click target
    const target = event.target.shadowRoot ? eventPath(event)[0] : event.target;

    // click target not inside menu, close menu
    if (!menuRef.current.contains(target)) {
      closeMenu();
    }
  };

  // listen any time
  useEffect(() => {
    //test
    console.log("add listener");
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      // don't listen mouse down
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  });

  return (
    <>
      <button
        // button click
        onClick={event => {
          // toggle menu
          toggleMenu(index);
        }}
      >
        click to toggle
      </button>
      {isShowMenu && (
        <div ref={menuRef} style={{ backgroundColor: "white" }}>
          menu
        </div>
      )}
    </>
  );
}

export default Menu;
