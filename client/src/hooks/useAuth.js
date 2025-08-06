import { useEffect } from "react";
import authStore from "../store/AuthStore";
import axios from "../Config/axiosInstence";
export const useAuth = () => {
    const { user, loading, setUser, setLoading } = authStore();
    const fetchUser = async () => {
        try {
            const res = await axios.get("/users/me");
            setUser(res.data.payload);
        }
        catch {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user === null && loading) {
            fetchUser();
        }
    }, [user, loading]);
    return { user, loading, refresh: fetchUser };
};
