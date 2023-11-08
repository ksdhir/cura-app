import Graph from "../../assets/icons/svg/graph.svg";
import { Text, TouchableOpacity, View } from "react-native";
import curaTheme from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";

const GraphHeader = ({ data, threshold }) => {
  const navigation = useNavigation();

  const bpm = data?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const minThreshold = threshold?.detail?.minimum;
  const maxThreshold = threshold?.detail?.maximum;

  const bpmStatus =
    bpm >= minThreshold && bpm <= maxThreshold
      ? "Normal"
      : bpm < minThreshold
      ? "Low"
      : "High";

  return (
    <View className="flex flex-row w-full justify-between  items-start">
      <Text
        className=" bg-successDark px-4 py-1 rounded-full text-curaWhite text-sm"
        style={{
          fontFamily: curaTheme.fontFamilies.SatoshiMedium,
          backgroundColor:
            bpm >= minThreshold && bpm <= maxThreshold
              ? curaTheme.lightColors.successDark
              : curaTheme.lightColors.errorDark,
        }}
      >
        {bpmStatus}
      </Text>

      <TouchableOpacity
        className="bg-primary p-[6px] rounded-md"
        onPress={() =>
          navigation.navigate("HeartRateHistoryScreen", {
            bpm,
            elderEmailData,
            minThreshold,
            maxThreshold,
          })
        }
      >
        <Graph
          width={28}
          height={28}
          style={{
            color: "#fff",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GraphHeader;
