import { fetchFn, Method } from "../static/js/requests/fetch-fn/fetch-fn";

interface IAuthResponse {
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  errors: Array<{ message: string; field?: string }> | null;
}

export class AuthApi {
  private static readonly API_URL = `${process.env.REACT_APP_API_URL}/auth`;
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
    fullName: string,
    password: string,
    passwordConfirmation: string
  ): Promise<IAuthResponse> {
    return fetchFn(Method.POST, `${this.API_URL}/sign-up`, {
      email,
      fullName,
      password,
      passwordConfirmation,
    });
  }

  public static async signIn(
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    return fetchFn(Method.POST, `${this.API_URL}/sign-in`, {
      email,
      password,
    });
  }

  public static async signOut(): Promise<IAuthResponse> {
    return fetchFn(Method.POST, `${this.API_URL}/sign-out`);
  }

  public static async getUserInfo(): Promise<IAuthResponse> {
    return fetchFn(Method.GET, `${this.API_URL}/user-info`);
  }
}
