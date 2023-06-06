import http from "./interceptor/Axiosinterceptor";
export default class OffreService {
    GetAllAppels() {
        return http.get(`/appel_offre/GetAllOffres`)
    }
    GetAllOffres() {
        return http.get(`/appel_offre/GetAllOffres`)
    }
    GetOffresNonLouer() {
        return http.get(`/appel_offre/GetOffresNonLouer`)
    }
    AddNewOffre(data) {
        return http.post(`/appel_offre/AddNewOffre`, data)
    }
    UpdateOffreById(id, data) {
        return http.put(`/appel_offre/UpdateOffreById/${id}`, data)
    }
}