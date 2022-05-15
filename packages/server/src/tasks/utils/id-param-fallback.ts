import {IdParamError} from "../../errors/id-param-error";

export const idParamFallback = async () => {
	throw new IdParamError();
};
