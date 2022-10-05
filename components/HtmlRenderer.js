import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { BLACK } from "../color";

const HtmlRenderer = React.memo(({ mainText, fontSize }) => {
  const { width } = useWindowDimensions();

  const systemFonts = ["Mapo"];

  const htmlStyle = {
    fontFamily: "Mapo",
    fontSize,
    color: BLACK,
  };

  return (
    <RenderHtml
      source={{ html: mainText }}
      contentWidth={width}
      systemFonts={systemFonts}
      baseStyle={htmlStyle}
    />
  );
});

export default HtmlRenderer;
