import { AxiosClient } from "api/AxiosClient"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async() => {
        const response = await AxiosClient.post('auth/refresh-token', {
            refreshToken: auth?.refreshToken,
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response?.data.data.accessToken);
            return { ...prev, 
                    accessToken: response?.data.data.accessToken, 
                    refreshToken: response?.data.data.refreshToken,
                    role: response?.data.data.role
                };
        });
        return response?.data.data.accessToken;
    }
    return refresh;
}; 

export default useRefreshToken