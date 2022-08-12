import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { BLACK, GREY } from "../color";

const Record = ({ title, mainText, date }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={2} style={styles.mainText}>
        {mainText}
      </Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Snow",
    fontSize: 22,
    color: BLACK,
  },
  mainText: {
    fontFamily: "Mapo",
    fontSize: 17,
    marginTop: 10,
    height: 41,
    color: GREY,
  },

  date: {
    fontSize: 15,
    fontWeight: "400",
    color: BLACK,
    marginTop: 5,
    marginLeft: 2,
    marginBottom: 7,
  },
});

export default Record;
