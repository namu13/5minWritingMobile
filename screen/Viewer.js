import { useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import HtmlRenderer from "../components/HtmlRenderer";
import { DBContext } from "../context";

const Viewer = ({ route, navigation }) => {
  const realm = useContext(DBContext);

  const { title, mainText, date, id } = route.params;

  const chevrOnPress = () => navigation.navigate("Home");

  const trashOnPress = () =>
    Alert.alert("정말로 삭제할까요?", "삭제한 내용은 되돌릴 수 없어요.", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          realm.write(() => {
            const document = realm.objectForPrimaryKey("Document", id);
            realm.delete(document);
          });
          navigation.navigate("Home");
        },
      },
    ]);

  return (
    <>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={chevrOnPress}>
          <Entypo name="chevron-thin-left" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity onPress={trashOnPress}>
          <Feather name="trash" style={styles.trash} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.mainTextContainer}>
          <HtmlRenderer mainText={mainText} fontSize={21} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 0,
  },
  chevron: {
    fontSize: 28,
  },
  trash: {
    fontSize: 28,
    marginTop: 5,
  },
  textContainer: {
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "Snow",
    marginBottom: 7,
  },
  date: {
    fontSize: 17,
    fontFamily: "Mapo",
  },
  mainTextContainer: {
    marginTop: 15,
  },
});

export default Viewer;
