import React, { useRef, useEffect, useState, useCallback } from "react";
import { eventPath } from "./eventPath.js";

function Menu({ index, isShowMenu, closeMenu, toggleMenu }) {
  // menu ref
  const menuRef = useRef(null);

  // this run, then button click will run
  const handleClick = event => {
    console.log("-- 3 --", "handleClick index: ", index);

    if (menuRef.current === null) {
      // * the menu won't appear, so ref is null, until click the button
      console.log("-- 3.1 --", "menuRef is null, no more checking in or out");
      return;
    }

    const target = event.target.shadowRoot ? eventPath(event)[0] : event.target;
    // yes click outside
    if (!menuRef.current.contains(target)) {
      //test
      console.log("target", target);
      const ownButtonId = "button_" + index;
      if (ownButtonId === target.id) {
        // click own ... button, skip this
      } else {
        // or click outside or other button, close this
        closeMenu();
      }

      /*
      if (isButtonClickRef.current) {
        console.log("-- 3.2 --", "click ... button, no close menu");
      } else {
        // * or current click outside area, this should close
        console.log("-- 3.4 --", "close outside, close menu");
        closeMenu();
      }
      */
    } else {
      // click inside
      console.log("-- 3.5 --", "click inside download button");
    }
  };

  // listener added at page load
  useEffect(() => {
    //test
    console.log("-- 2 --", "add listener");
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      //test
      console.log("-- 2.1 --", "unmount, remove listener");
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  });

  return (
    <div>
      <button
        id={"button_" + index}
        onClick={event => {
          console.log("-- 1 -- button click");
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
