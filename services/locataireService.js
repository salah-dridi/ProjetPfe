import http from "./interceptor/Axiosinterceptor";

export default class LocataireService {

    LoginLocataire(data) {
    return http.post(`/locataire/loginlocataire`,data)
    }
    GetAllLocataires() {
        return http.get(`/locataire/GetAllLocataires`)
    }
    AddNewLocataire(data) {
        return http.post(`/locataire/AddNewLocatairefaux`, data)
    }
    GetLocataireById(id) {
        return http.get(`/locataire/GetLocataireById/${id}`)
    }
    DeleteLocataireById(id) {
        return http.delete(`/locataire/DeleteLocataireById/${id}`)
    }
}