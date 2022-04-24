import mrgn from "morgan";
import { isDev } from "../env/is-dev";
import { logger } from "../utils/logger";

export const morgan = mrgn(
	`:method :url :status :res[content-length] - :response-time ms`,

	{
		stream: {
			write(message: string) {
				return logger.http(message);
			},
		},
		skip() {
			return !isDev();
		},
	}
);
