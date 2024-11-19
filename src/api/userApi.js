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

export const createEvent = async (data) =>{
  try {
    return await Api.post(userEndPoints.event,data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteEvent = async (userId,eventId) =>{
  try {
    return await Api.delete(`${userEndPoints.event}/${userId}/${eventId}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const editEvent = async (data)=>{
  try {
    return await Api.patch(userEndPoints.event,data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllEvents = async (userId,search,filter,page)=>{
  try {
    return await Api.get(`${userEndPoints.event}/${userId}/search?query=${search}&filter=${JSON.stringify(filter)}&page=${page}`);
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logout = async ()=>{
  try {
    return await Api.post(userEndPoints.logout)
  } catch (error) {
    return Promise.reject(error)
  }
}