import { Text, View } from "react-native";
import IconBtn from "../IconBtn";
import curaTheme from "../../theme/theme";

const ThresholdItem = ({ title, value, onChange }) => {
  const handleAdd = () => {
    onChange(value + 1);
  };

  const handleSubtract = () => {
    onChange(value - 1);
  };

  return (
    <View>
      <Text className="text-[18px] text-center font-SatoshiBlack">{title}</Text>

      <View className="flex flex-row justify-between items-center">
        <IconBtn
          name="subtract"
          height={40}
          width={40}
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
          onPress={handleSubtract}
        />

        <View>
          <Text
            className="font-SatoshiBlack 
        text-secondaryDark text-[60px]"
          >
            {value}
          </Text>
          <Text className="text-center font-SatoshiBold text-[16px] text-[#5E5E5E]">
            BPM
          </Text>
        </View>

        <IconBtn
          name="add"
          height={40}
          width={40}
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
          onPress={handleAdd}
        />
      </View>
    </View>
  );
};

export default ThresholdItem;
