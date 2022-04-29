import { axiosClient } from "../lib/axios-client";
import { Method } from "../static/js/requests/fetch-fn/fetch-fn";

interface IAuthResponse {
  data: {
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  errors: Array<{ message: string; field?: string }> | null;
}
}

export class AuthApi {
  private static readonly API_URL = "/auth";
  private static _instance: AuthApi;

  private constructor() {}

  static get instance() {
    if (!AuthApi.instance) {
      this._instance = new AuthApi();
    }

    return this._instance;
  }

  public static async signUp(
    email: string,
    name: string,
    password: string,
    passwordConfirmation: string
  ): Promise<IAuthResponse> {
    return axiosClient[Method.POST](`${this.API_URL}/sign-up`, {
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
    return axiosClient[Method.POST](`${this.API_URL}/sign-in`, {
      email,
      password,
    });
  }

  public static async signOut(): Promise<IAuthResponse> {
    return axiosClient[Method.POST](`${this.API_URL}/sign-out`);
  }

  public static async getUserInfo(): Promise<IAuthResponse> {
    return axiosClient[Method.GET](`${this.API_URL}/user-info`);
  }
}
