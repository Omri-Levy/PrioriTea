import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const toggle = () => setIsToggled((prevState) => !prevState);
  const toggleOn = () => setIsToggled(true);
  const toggleOff = () => setIsToggled(false);

  return { isToggled, toggle, toggleOn, toggleOff };
};
