import { useState } from "react";

export const useToggle = function (initialState = false) {
  const [isToggled, setIsToggled] = useState(initialState);
  const toggle = function () {
    setIsToggled(function (prevState) {
      return !prevState;
    });
  };
  const toggleOn = function () {
    setIsToggled(true);
  };
  const toggleOff = function () {
    setIsToggled(false);
  };

  return { isToggled, toggle, toggleOn, toggleOff };
};
