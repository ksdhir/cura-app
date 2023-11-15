import { createTheme } from "@rneui/themed";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const curaTheme = createTheme({
  lightColors: {
    primary: "#09C1CB",
    primaryDark: "#007F86",
    secondary: "#F6A8C0",
    secondaryDark: "#F66490",
    error: "#EE754E",
    errorDark: "#EF5B3B",
    success: "#34CD8D",
    successDark: "#22AD73",
    curaWhite: "#F8FFFE",
    curaGray: "#849A99",
    curaBlack: "#263130",
  },

  fontSizes: {
    sm: 14,
    base: 16,
    lg: 18,
    xl: 22,
    "2xl": 24,
    "3xl": 26,
    "4xl": 28,
    "5xl": 32,
    "6xl": 60,
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "700",
    black: "900",
  },
  fontFamilies: {
    SatoshiMedium: "SatoshiMedium",
    SatoshiBold: "SatoshiBold",
    SatoshiBlack: "SatoshiBlack",
    LemonLove: "LemonLove",
  },
  components: {
    Button: {
      containerStyle: {
        height: 48,
        width: "100%",
        borderRadius: 12,
        marginVertical: 8,
      },
      buttonStyle: {
        height: 48,
        borderRadius: 12,
      },
      titleStyle: {
        color: "#F8FFFE",
      },
    },

    Input: {
      containerStyle: {
        height: 45,
        marginVertical: 8,
      },
      labelStyle: {
        color: "#263130",
      },
      inputContainerStyle: {
        borderBottomWidth: 1,
        borderColor: "#263130",
      },
    },
  },
  mode: "light", // or 'dark'
});

export default curaTheme;
