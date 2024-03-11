import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";
import "@fontsource/poppins";
import "@fontsource-variable/reem-kufi";

export const fondantTheme = extendTheme({
  styles: {
    global: {
      body: {
        mx: "0",
        marginInlineStart: "0",
        fontFamily: "primary",
        marginRight: "calc(-1 * (100vw - 100%))",
        overflowX: "hidden",
      },
    },
  },
  fonts: {
    primary: "Inter Variable",
    secondary: "Poppins",
    logo: "Reem Kufi Variable",
  },
  colors: {
    pri: {
      orange: "#D23403",
      dark: "#11141D",
      beige: "#FFF3E4",
    },
    grey: {
      50: "#EEEEF0",
      100: "#C9C9D1",
      200: "#AFB1BB",
      300: "#8A8B9D",
      400: "#737589",
      800: "#1A202C",
      border: "#31363C",
    },
  },
  components: {
    Tabs: {
      variants: {
        line: {
          tab: {
            color: "grey.100",
            gap: "8px",
            // _selected: { // TODO: these settings are in conflict with navbar
            //   color: "pri.orange",
            // },
            // _active: {
            //   bg: "pri.dark",
            // },
          },
        },
      },
    },
    Modal: {
      marginRight: "calc(-1 * (100vw - 100%))",
      overflowX: "hidden",
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
            borderColor: "white",
            borderRadius: "40px",
            borderWidth: "1px",
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "grey.100",
      },
    },
  },
});
