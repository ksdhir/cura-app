import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { encode } from "js-base64";
import useAuth from "./useAuth";

type TokenData = {
  access_token: string;
  refreshToken: string;
  expires_in: number;
  scope: string;
  user_id: string;
  token_type: string;
};

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
  tokenEndpoint: "https://api.fitbit.com/oauth2/token",
  revocationEndpoint: "https://api.fitbit.com/oauth2/revoke",
};

const useFitbitAuth = () => {
  const { user } = useAuth();
  const [isRequestLoaded, setIsRequestLoaded] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_FITBIT_CLIENT_ID,
      scopes: ["heartrate"],
      redirectUri: makeRedirectUri({
        scheme: "com.curaapp.cura",
      }),
    },
    discovery
  );

  const getHeartRate = async () => {
    console.log("GETTING HEART RATE");
    try {
      const tokenDetails = await AsyncStorage.getItem("@FITBIT_tokenDetails");
      // /1/user/[user-id]/activities/heart/date/[date]/[period].json
      const parsedTokenDetails = JSON.parse(tokenDetails);
      console.log(parsedTokenDetails.access_token);

      const response = await fetch(
        `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json`,
        {
          headers: {
            Authorization: `Bearer ${parsedTokenDetails.access_token}`,
          },
        }
      );

      if (response?.status === 200) {
        const data = await response.json();
        // console.log("====================================");
        // console.log(data["activities-heart-intraday"]);
        // console.log("====================================");
        return data["activities-heart-intraday"];
      } else if (response?.status === 401) {
        //Refresh token
        const result = await handleRefreshToken();

        if (result) {
          getHeartRate();
        }
      } else {
        console.log("Invalid Args");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getAccessToken = async ({ code }) => {
    const concatenatedString = `${process.env.EXPO_PUBLIC_FITBIT_CLIENT_ID}:${process.env.EXPO_PUBLIC_FITBIT_CLIENT_SECRET}`;
    const base64Encoded = encode(concatenatedString);

    const options = {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64Encoded,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const result = await fetch(
        `${discovery.tokenEndpoint}?grant_type=authorization_code&code=${code}&code_verifier=${request?.codeVerifier}&redirect_uri=com.curaapp.cura://`,
        options
      );

      if (result.status === 200) {
        const data = await result.json();
        setTokenData(data);
        await AsyncStorage.setItem(
          "@FITBIT_tokenDetails",
          JSON.stringify(data)
        );
      } else {
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleRefreshToken = async () => {
    try {
      const tokenDetails = await AsyncStorage.getItem("@FITBIT_tokenDetails");
      const parsedTokenDetails = JSON.parse(tokenDetails);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const result = await fetch(
        `${discovery.tokenEndpoint}?grant_type=refresh_token&client_id=${process.env.EXPO_PUBLIC_FITBIT_CLIENT_ID}&refresh_token=${parsedTokenDetails.refresh_token}`,
        options
      );

      if (result.status === 200) {
        const data = await result.json();

        setTokenData(data);

        await AsyncStorage.setItem(
          "@FITBIT_tokenDetails",
          JSON.stringify(data)
        );

        return data;
      } else {
        throw new Error("Invalid Request");
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (!user || !request || isRequestLoaded) return;

    const init = async () => {
      console.log("INIT");
      try {
        // Get the stored access token and refresh token
        const tokenDetails = await AsyncStorage.getItem("@FITBIT_tokenDetails");

        console.log("TOKEN DETAILS", tokenDetails);
        if (!tokenDetails) {
          console.log("PROMPTING ASYNC!");
          const result = await promptAsync();
        }
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setIsRequestLoaded(true);
      }
    };

    init();

    console.log("I GOT CALLED!");
  }, [request, isRequestLoaded, user]);

  //Once promptAsync this hook will get triggered
  useEffect(() => {
    if (!user) return;

    if (response?.type === "success") {
      const { code } = response.params;

      if (!tokenData) {
        getAccessToken({ code });
      } else {
        console.log("--TOKEN DATA", tokenData);
      }
    } else {
      console.log("RESPONSE", response);
      console.log("TOKEN DATA", tokenData);
      console.log("isRequestLoaded", isRequestLoaded, request);
    }
  }, [response, user]);

  return {
    tokenData,
    getHeartRate,
  };
};

export default useFitbitAuth;
