import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { BLACK } from "../color";

const HtmlRenderer = ({ mainText, fontSize }) => {
  const { width } = useWindowDimensions();

  const htmlStyle = {
    fontFamily: "Mapo",
    fontSize,
    color: BLACK,
  };

  return (
    <RenderHtml
      source={{ html: mainText }}
      contentWidth={width}
      systemFonts={["Mapo"]}
      baseStyle={htmlStyle}
    />
  );
};

export default HtmlRenderer;
