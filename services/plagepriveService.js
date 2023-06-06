import http from "./interceptor/Axiosinterceptor";
export default class PlagePriveService {
    GetAllPlagesPrives() {
        return http.get(`/plage_prive/GetAllPlagesPrives`)
    }

}