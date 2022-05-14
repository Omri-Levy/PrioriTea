import {useState} from "react";
import {FunctionVoidReturn} from "@prioritea/types";

/**
 * @description Providers a boolean state, a toggle, toggleOn, and toggleOff functions.
 * @param {boolean} [initialState = false] - Initial boolean of the toggle.
 * @return [isToggled, toggle, toggleOn, toggleOff]
 */
export const useToggle = (initialState = false): [boolean, FunctionVoidReturn, FunctionVoidReturn, FunctionVoidReturn] => {
	const [isToggled, setIsToggled] = useState(initialState);
	const toggle = () => setIsToggled((prevState) => !prevState);
	const toggleOn = () => setIsToggled(true);
	const toggleOff = () => setIsToggled(false);

	return [isToggled, toggle, toggleOn, toggleOff];
};
