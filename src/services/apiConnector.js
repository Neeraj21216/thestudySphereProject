import axios from "axios"

export const axiosInstance=axios.create({});

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