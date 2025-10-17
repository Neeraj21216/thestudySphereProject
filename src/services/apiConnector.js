import axios from "axios"

export const axiosInstance=axios.create({
     baseURL: "https://study-notion-backend-ar34.onrender.com/api/v1",  
    // baseURL: "http://localhost:4000/api/v1",  
    timeout: 10000,  
    withCredentials: true,  // ✅ Ensure cookies are sent
});

export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
       headers,
       params:params?params:null,
       withCredentials: true, // This allows cookies to be sent

    })
};