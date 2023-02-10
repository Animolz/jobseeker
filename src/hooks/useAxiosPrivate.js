import { AxiosClient } from "api/AxiosClient"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"

const useAxiosPrivate = () => { 
    const refresh = useRefreshToken();
    const { auth } = useAuth(); 

    useEffect(() => {
        const requestIntercept = AxiosClient.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `nhn ${auth?.accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = AxiosClient.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `nhn ${newAccessToken}`;
                    return AxiosClient(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return() => {
            AxiosClient.interceptors.request.eject(requestIntercept);
            AxiosClient.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return AxiosClient;
}

export default useAxiosPrivate