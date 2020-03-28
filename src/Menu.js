import React, { useRef, useEffect, useState, useCallback } from "react";
import { eventPath } from "./eventPath.js";

function Menu({ index, isShowMenu, closeMenu, toggleMenu }) {
  // menu ref
  const menuRef = useRef(null);

  // when clicking the button, this will run then button will run, because consider click outside
  const handleClick = event => {
    //test
    console.log("-- 3 --", "handleClick");

    // null out
    if (menuRef === null || menuRef.current === null) {
      console.log("menuRef null out");
      return;
    }

    // find click target
    const target = event.target.shadowRoot ? eventPath(event)[0] : event.target;

    // click target not inside menu, close menu
    if (!menuRef.current.contains(target)) {
      // button is clicked before, no touch
      console.log("-- 3.1--", "close menu");
      closeMenu();
    }
  };

  // * listener only adds once, no more add listener
  // * it means handler is listening
  useEffect(() => {
    //test
    console.log("-- 2 --", "add listener");
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      //test
      console.log("-- 2.1 --", "remove listener");
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  }, []);

  return (
    <div>
      <button
        // button click
        onClick={event => {
          //test
          console.log("-- 1 -- button click");
          // toggle index
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
    </div>
  );
}

export default Menu;
