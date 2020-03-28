import React, { useRef, useEffect, useState, useCallback } from "react";
import { eventPath } from "./eventPath.js";

function Menu({ index, isShowMenu, showMenu, closeMenu, toggleMenu }) {
  // menu ref
  const menuRef = useRef(null);
  const isButtonClickRef = useRef(false);

  // this run, then button click will run
  const handleClick = event => {
    console.log("-- 3 --", "handleClick index: ", index);

    if (menuRef.current === null) {
      // * the menu won't appear, so ref is null, until click the button
      console.log("-- 3.1 --", "menuRef is null, no more checking in or out");
      return;
    }

    const target = event.target.shadowRoot ? eventPath(event)[0] : event.target;
    if (!menuRef.current.contains(target)) {
      // * click the ... button, no close menu
      if (isButtonClickRef.current) {
        console.log("-- 3.2 --", "click ... button, no close menu");
      } else {
        // * or click outside area, this should close
        console.log("-- 3.4 --", "close outside, close menu");
        closeMenu();
      }
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
        onClick={event => {
          console.log("-- 1 -- button click");
          // * it should show menu and into outMode
          toggleMenu(index);
          isButtonClickRef.current = true;
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
