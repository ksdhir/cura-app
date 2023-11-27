import { View, Dimensions, Text } from "react-native";

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
import HeartRateGraph from "../../components/Home/HeartRateGraph";

import NoElderProfileFound from "../../components/Home/NoElderProfileFound";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function HeartRateMainScreen() {
  const { profileType } = useAuth();
  const isFocused = useIsFocused();

  const [elderEmailData, setElderEmailData] = useState("");
  const [elderProfile, setElderProfile] = useState(null);
  const [heartRateDetail, setHeartRateDetail] = useState(null);
  const [heartRateThreshold, setHeartRateThreshold] = useState(null);

  const { user, token } = useAuth();
  const userLoggedIn = profileType;

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    console.log("inside here now");
    if (!user) return;
    const caregiverEmail = user.email;
    let elderEmail;

    const init = async () => {
      try {
        if (userLoggedIn === "Caregiver") {
          const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
          elderEmail = data.caregiver?.elderEmails[0];

          if (elderEmail) {
            setElderEmailData(elderEmail);
          } else {
            setElderEmailData(undefined);
          }
        } else {
          //Elder flow
          elderEmail = user.email;
          setElderEmailData(elderEmail);
        }

        if (elderEmail === undefined) return;

        // Now that you have elderEmail, you can make other async calls
        getElderProfile(elderEmail).then((profile) => {
          setElderProfile(profile);
        });

        getElderHeartRateDetail(elderEmail).then((heartRateDetail) => {
          setHeartRateDetail(heartRateDetail);
        });

        getElderHeartRateThreshold(elderEmail).then((heartRateThreshold) =>
          setHeartRateThreshold(heartRateThreshold)
        );
      } catch (error) {
        throw Error("Could not get elder profile");
      }
    };

    init();
  }, [isFocused, user]);

  // elderEmail is undefined -> write down a message to add Elder
  if (elderEmailData === undefined) {
    return <NoElderProfileFound />;
  }

  // LOAD if not all of those are loaded
  if (!elderProfile || !heartRateDetail || !heartRateThreshold) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-between px-4 bg-curaWhite">
      <StatusBar style="auto" />
      <>
        <HomeHeader
          userLoggedIn={userLoggedIn}
          profile={elderProfile}
          elderEmailData={elderEmailData}
        />

        <View className="flex w-full items-center">
          <AnimatedElderAvatar
            heartRateDetail={heartRateDetail}
            heartRateThreshold={heartRateThreshold}
          />

          <View
            className="mb-8 p-4 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
            style={{
              height: height * 0.5,
            }}
          >
            <GraphHeader
              data={heartRateDetail}
              heartRateThreshold={heartRateThreshold}
              elderEmailData={elderEmailData}
            />

            <HeartRateGraph
              heartRateDetail={heartRateDetail}
              heartRateThreshold={heartRateThreshold}
            />
          </View>
        </View>
      </>
    </SafeAreaView>
  );
}
