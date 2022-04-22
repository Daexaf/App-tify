// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        // bgGradient: "linear(to-r, red.500, black)",
        bg: "#346A87",
        color: "white",
        backgroundRepeat: "no-repeat",
      },
      // styles for the `a`
      a: {
        color: "white",
        _hover: {
          textDecoration: "underline",
        },
        // Heading: {
        // ,
        // },
      },
    },
  },
});

// Version 2: Using functions
const overrides = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        lineHeight: "base",
      },
    }),
  },
});

export { theme, overrides };
