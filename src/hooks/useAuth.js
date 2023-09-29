import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return { user };
}
