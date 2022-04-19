/**
 * Checks for at least one upper case letter,
 * one lower case letter, one number, and one special character.
 */
const specialUpperLowerNum =
	/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/;
