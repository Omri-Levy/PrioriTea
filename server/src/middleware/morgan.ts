import mrgn from "morgan";
import { isDev, logger } from "..";

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
