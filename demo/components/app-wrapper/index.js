import React, { useState } from "react";
import { ThemeProvider, css, createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { Input, theme, Box, Type } from "blockstack-ui";

const styles = css`
html, body{
  font-family: ${theme.fonts.default};
}
${normalize()};
*{
box-sizing: border-box;
`;
const GlobalStyles = createGlobalStyle`
${styles};
`;

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box bg={"blue.light"} minHeight="100vh">
      <GlobalStyles />
      <Box maxWidth={900} mx="auto" p={4}>
        {children}
      </Box>
    </Box>
  </ThemeProvider>
);
