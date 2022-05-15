import {stringUtils} from "@prioritea/utils";

export const formatTaskStatus = (status: string) => stringUtils(status).toKebabCase().toCapitalized().string
