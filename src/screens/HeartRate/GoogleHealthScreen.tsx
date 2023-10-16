import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";

const useHealthData = () => {
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  const [androidPermissions, setAndroidPermissions] = useState<Permission[]>(
    []
  );

  useEffect(() => {
    const init = async () => {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.log("Failed to initialize Health Connect");
        return;
      }

      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "Distance" },
        { accessType: "read", recordType: "FloorsClimbed" },
      ]);

      setAndroidPermissions(grantedPermissions);
    };

    init();
  }, []);

  const hasAndroidPermission = (recordType: string) => {
    return androidPermissions.some((perm) => perm.recordType === recordType);
  };

  useEffect(() => {
    if (!hasAndroidPermission("Steps")) {
      return;
    }
    const getHealthData = async () => {
      const today = new Date();
      const timeRangeFilter: TimeRangeFilter = {
        operator: "between",
        startTime: new Date(today.getTime() - 86400000).toISOString(),
        endTime: today.toISOString(),
      };

      // Steps
      const steps = await readRecords("Steps", { timeRangeFilter });
      const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
      setSteps(totalSteps);
    };

    getHealthData();
  }, [androidPermissions]);

  return { steps, flights, distance };
};

type ValueProps = {
  label: string;
  value: string;
};

const Value = ({ label, value }: ValueProps) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: "black",
    fontSize: 20,
  },
  value: {
    fontSize: 45,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});

export default function GoogleHealthScreen() {
  const { steps, distance, flights } = useHealthData();

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View>
    //     <Value label="Steps" value={steps.toString()} />
    //     <Value label="Flights" value={flights.toString()} />
    //     <Value label="Distance" value={distance.toString()} />
    //   </View>
    // </SafeAreaView>
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Flights" value={flights.toString()} />
        <Value label="Distance" value={distance.toString()} />
      </View>
    </SafeAreaView>
  );
}
