import { Text, TouchableOpacity } from "react-native";

const TestPrimaryBtn = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 my-3 w-5/6 rounded-md bg-slate-600"
    >
      <Text className="text-base text-center font-bold text-neutral-100">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TestSecondaryBtn = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 px-4 my-3 w-5/6 rounded-md border bg-neutral-100 border-slate-600"
    >
      <Text className="text-base text-center font-bold text-slate-600">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CriticalLog = ({ logId, logTime, logType }) => {
  return (
    <View className="flex flex-col space-y-4 p-4">
      <Text>{logId}</Text>
      <Text>{logTime}</Text>
      <Text>{logType}</Text>
    </View>
  );
};

export { TestPrimaryBtn, TestSecondaryBtn, CriticalLog };
