import { View, Dimensions } from "react-native";

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  getElderEmailFromCaregiverEmail,
  getElderProfile,
  getElderHeartRateDetail,
  getElderHeartRateThreshold,
} from "../../services/elder";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../hooks/useAuth";
import AnimatedElderAvatar from "../../components/AnimatedElderAvatar";
import HomeHeader from "../../components/Home/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import GraphHeader from "../../components/Home/GraphHeader";
import HeartRateGraph from '../../components/Home/HeartRateGraph';


const { width, height } = Dimensions.get("window");

export default function HeartRateMainScreen() {
  const { profileType } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [elderEmailData, setElderEmailData] = useState("");
  const [elderProfile, setElderProfile] = useState(null);
  const [heartRateDetail, setHeartRateDetail] = useState(null);
  const [heartRateThreshold, setHeartRateThreshold] = useState(null);

  const { user, token } = useAuth();
  const userLoggedIn = profileType;

  useEffect(() => {
    if (!user) return;
    const caregiverEmail = user.email;
    let elderEmail;

    const init = async () => {
      try {
        if (userLoggedIn === "Caregiver") {
          if (isFirstLoad) {
            setLoading(true); // Set loading to true only on the first app load
          }

          const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
          // console.log("CAREGIVER EMAIL --- 3", caregiverEmail);

          elderEmail = data.caregiver?.elderEmails[0];
          // console.log("ELDER EMAIL --- 4", elderEmail);

          if (isFirstLoad) {
            setLoading(false); // Set loading to false on the first app load after data retrieval
            setIsFirstLoad(false); // Set isFirstLoad to false to prevent further loading
          }
        } else {
          //Elder flow
          elderEmail = user.email;
        }

        //

        setElderEmailData(elderEmail);

        // Now that you have elderEmail, you can make other async calls
        getElderProfile(elderEmail).then((profile) => {
          setElderProfile(profile);
          console.log(elderEmailData);
        });

        getElderHeartRateDetail(elderEmail).then((heartRateDetail) =>
          setHeartRateDetail(heartRateDetail)
        );

        getElderHeartRateThreshold(elderEmail).then((heartRateThreshold) =>
          setHeartRateThreshold(heartRateThreshold)
        );
      } catch (error) {
        console.log("error", error.message);
        throw Error("Could not get elder profile");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user, isFirstLoad]);

  if (loading || !elderProfile || !heartRateDetail || !heartRateThreshold) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />

      <>
        <HomeHeader userLoggedIn={userLoggedIn} profile={elderProfile} />

        <AnimatedElderAvatar />

        <View
          className="mb-8 p-4 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
          style={{
            height: height * 0.5,
          }}
        >
          <GraphHeader data={heartRateDetail} threshold={heartRateThreshold} elderEmailData={elderEmailData} />

          <HeartRateGraph heartRateDetail={heartRateDetail} heartRateThreshold={heartRateThreshold} />
        </View>
      </>
    </SafeAreaView>
  );
}
