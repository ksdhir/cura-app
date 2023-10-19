import { useEffect, useState } from "react";
import { auth } from "../utils/FirebaseConfig";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user, token };
}
