import Axios from "../plugins/http/axios.instance"

interface ILoginReq {
  email: string
  password: string
  remember?: boolean
}

interface IRegisterReq {
  name: string
  email: string
  password: string
  type?: "teacher" | "student"
}

interface IForgotPasswordReq {
  email: string
}

interface ICheckTokenReq {
  tokenId: string
  code: string
}

interface IResetPasswordReq {
  tokenId: string
  code: string
  password: string
  password_confirm: string
}
export class AuthService {
  static async login(data: ILoginReq) {
    const response = await Axios.post("/auth/login", data)
    return response.data
  }

  static async register(data: IRegisterReq) {
    const response = await Axios.post("/auth/register", data)
    return response.data
  }

  static async forgotPassword(data: IForgotPasswordReq) {
    const response = await Axios.post("/auth/forgot-password", data)
    return response.data
  }

  static async checkToken(data: ICheckTokenReq) {
    const response = await Axios.post("/auth/check-token", data)
    return response.data.data as boolean
  }

  static async resetPassword(data: IResetPasswordReq) {
    const response = await Axios.post("/auth/reset-password", data)
    return response.data
  }
}
