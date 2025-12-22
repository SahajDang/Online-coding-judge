import { api } from "../../../shared/services/api-client"

export const doLogin = async (userObject) => {
    const response = await api.post('login', userObject);
    return response.data;
}

export const doRegister = async (userObject) => {
    const response = await api.post('register', userObject);
    return response.data;
}