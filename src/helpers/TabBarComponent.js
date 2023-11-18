import { Pressable, StyleSheet, Text, View } from "react-native";
import curaTheme from "../theme/theme";
import { useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 400 }),
          scale: withSpring(active ? 1 : 0, { damping: 10 }),
        },
        {
          translateY: withTiming(active ? -15 : 0),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.7, { duration: 400 }),
      transform: [
        {
          translateY: withTiming(active ? -15 : 0),
        },
      ],
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
        {!active && options.tabBarLabel && (
          <Text
            className="font-SatoshiBold text-xs text-curaWhite"
            style={styles.labelText}
          >
            {options.tabBarLabel}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: curaTheme.lightColors.primary,
    height: 80,
  },
  activeBackground: {
    position: "absolute",
    bottom: 15,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  component: {
    height: 70,
    width: 70,
    marginBottom: 5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: curaTheme.lightColors.primary,
    bottom: 7,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 45,
    width: 45,
  },
  labelText: {
    marginBottom: -16,
  },
});

export default TabBarComponent;
