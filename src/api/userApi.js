import Api from "../services/axios"
import { userEndPoints } from "../services/endpoints/userEndPoints"


export const loginApi = async (data) => {
  try {
    return await Api.post(userEndPoints.signIn, { email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerApi = async (data) => {
  try {
    return await Api.post(userEndPoints.signUp, { name: data.name,email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}