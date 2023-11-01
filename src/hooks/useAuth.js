import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);

    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    user,
    token,
  };
};

export default useAuth;
