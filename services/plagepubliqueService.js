import http from "./interceptor/Axiosinterceptor";
export default class PlagePubliqueService {
    GetAllPlagesPubliques() {
        return http.get(`/plage_publique/GetAllPlagesPubliques`)
    }
    GetEspacePlageById(id) {
        return http.get(`/plage_publique/GetPlagePubliqueById/${id}`)
    }
    getCentroidPlageById(id) {
        return http.get(`/plage_publique/GetCentroidPlagePubliqueById/${id}`)
    }
}