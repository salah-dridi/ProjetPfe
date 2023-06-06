import http from "./interceptor/Axiosinterceptor";
export default class CitoyenService {
    LoginCitoyen(data){
        return http.post(`/citoyen/logincitoyen`,data)
    }
    GetAllCitoyens() {
        return http.get(`/citoyen/GetAllCitoyens`)
    }
    DeleteAllCitoyens() {
        return http.delete(`/citoyen/DeleteAllCitoyens`)
    }
    SignUp(data){
        return http.post(`/citoyen/signup`, data)
    }

}