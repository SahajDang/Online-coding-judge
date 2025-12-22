import { api } from "../../../shared/services/api-client"

export const judgeAPI = {
    async run(payload){
        const response = await api.post('run', payload);
        return response.data;
    },
    async submit(payload){
        const response = await api.post('submit', payload);
        return response.data;
    }
}