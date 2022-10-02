import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { BLACK, GREY, LIGHT_GREY } from "../color";

const Record = ({ title, mainText, date }) => {
  const { width } = useWindowDimensions();

  const htmlStyle = {
    fontFamily: "Mapo",
    fontSize: 17,
    color: BLACK,
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <View style={styles.mainTextContainer}>
        <RenderHtml
          source={{ html: mainText }}
          contentWidth={width}
          systemFonts={["Mapo"]}
          baseStyle={htmlStyle}
        />
      </View>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Snow",
    fontSize: 22,
    color: BLACK,
  },
  mainTextContainer: {
    marginTop: 7,
    height: 43,
  },
  date: {
    fontSize: 15,
    fontWeight: "400",
    color: GREY,
    marginTop: 5,
    marginLeft: 2,
    marginBottom: 7,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: LIGHT_GREY,
  },
});

export default Record;
