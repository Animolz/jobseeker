import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";
import { Spinner } from "react-bootstrap";

const PersistLogin =() => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async() => {
            try {
                await refresh();
            } catch(err) {
                console.log(err);
            } finally {
                isMounted && setLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

        return() => isMounted = false;
    }, []);

    return (
        <>
            {!persist
                ? <Outlet />
                : loading 
                    ? <>
                        <Spinner animation="border" variant='info'/>
                        <p className="h4 mt-2">Loading yourself onto the page!</p>
                    </>
                    : <Outlet />
            
            }
        </>
    )   
}

export default PersistLogin