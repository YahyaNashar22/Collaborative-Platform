// hooks/useAuth.ts
import { useEffect } from "react";
import axios from "../Config/axiosInstence";
import authStore from "../store/AuthStore";

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = authStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/me");
        setUser(res.data.payload);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (user === null && loading) {
      fetchUser();
    }
  }, [user, loading, setUser, setLoading]);

  return { user, loading };
};
