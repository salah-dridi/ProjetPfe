import http from "./interceptor/Axiosinterceptor";
export default class AgentService {
    LoginMunicipalite(data) {
        return http.post(`/agent/loginmunicipalite`, data);
    }
    GetAllAgents() {
        return http.get(`/agent/GetAllAgents`)
    }
    AddNewAgent(data) {
        return http.post(`/agent/AddNewAgentfaux`, data)
    }
    DeleteAgentById(id) {
        return http.delete(`/agent/DeleteAgentById/${id}`)
    }
    UpdateAgentByID(id, data) {
        return http.put(`/agent/UpdateAgentByID/${id}`, data)
    }
    GetAgentById (id) {
        return http.get(`/agent/GetAgentById/${id}`)
    }
}