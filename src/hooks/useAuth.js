import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onAuthStateChanged = (user) => {
    if (user) {
      auth()
        .currentUser.getIdTokenResult()
        .then((result) => {
          const claims = result.claims;
          const profileType = claims.profileType;

          if (profileType) {
            setProfileType(profileType);
          }

          setUser(user);
          setIsLoaded(true);
        });
    }

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
    profileType,
    isLoaded,
  };
};

export default useAuth;
