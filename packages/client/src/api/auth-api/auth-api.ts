import {axiosClient} from "../../lib/axios-client";
import {IAuthResponse} from "./interfaces";

export class AuthApi {
	private static readonly API_URL = "/auth";

	private constructor() {
	}

	public static async signUp(
		email: string,
		name: string,
		password: string,
		passwordConfirmation: string
	): Promise<IAuthResponse> {
		return axiosClient.post(`${this.API_URL}/sign-up`, {
			email,
			name,
			password,
			passwordConfirmation,
		});
	}

	public static async signIn(
		email: string,
		password: string
	): Promise<IAuthResponse> {
		return axiosClient.post(`${this.API_URL}/sign-in`, {
			email,
			password,
		});
	}

	public static async signOut(): Promise<IAuthResponse> {
		return axiosClient.post(`${this.API_URL}/sign-out`);
	}

	public static async getUserInfo(): Promise<IAuthResponse> {
		return axiosClient.get(`${this.API_URL}/user-info`);
	}
}
