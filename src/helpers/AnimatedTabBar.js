import { StyleSheet, View } from "react-native";
import curaTheme from "../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useReducer } from "react";
import TabBarComponent from "../helpers/TabBarComponent";
import Svg, { Path } from "react-native-svg";

import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  Easing,
  withSpring,
  withSequence,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex).x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value) }],
    };
  });

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={140}
        height={145}
        viewBox="-7 -5 109.5 47"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={curaTheme.lightColors.curaWhite}
          d="M 2 17 c 2 0 3 6 3 9 c 0 17 13 36 35 36 s 35 -19 35 -36 c 0 -3 1 -9 3 -9 z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
              tabBarIcon={options.tabBarIcon}
            />
          );
        })}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

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
    // fontSize: 12,
    marginBottom: -16,
  },
});

export default AnimatedTabBar;
