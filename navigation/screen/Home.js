import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BLACK } from "../../color";
import Record from "../../components/Record";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.text_title}>5분 글쓰기</Text>
        <Text style={styles.text_subtitle}>지금까지 작성한 글</Text>
      </View>
      <View style={styles.record_container}>
        <ScrollView>
          <Record
            title="제목을 입력하세요"
            mainText="본문을 입력하세요 본문을 입력하세요 본문을 입력하세요 본문을 입력하세요 본문을 입력하세요 본문을 입력하세요"
            date="2022.08.01"
          />
        </ScrollView>
        {/* <Text style={styles.record_dummytext}>아직 작성한 글이 없어요!</Text> */}
      </View>
      <TouchableOpacity style={styles.writing_btn}>
        <MaterialCommunityIcons style={styles.btn_icon} name="pencil" />
        <Text style={styles.btn_text}>새 글 작성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  text_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_title: {
    fontFamily: "Snow",
    fontSize: 32,
    color: BLACK,
    marginTop: 25,
  },
  text_subtitle: {
    fontFamily: "Mapo",
    fontSize: 20,
    color: BLACK,
    marginTop: 10,
  },
  record_container: {
    flex: 4,
    alignItems: "center",
  },
  record_dummytext: {
    fontFamily: "Mapo",
    position: "absolute",
    top: "40%",
  },
  writing_btn: {
    flexDirection: "row",
    backgroundColor: BLACK,
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: 13,
    paddingVertical: 15,
    bottom: 40,
    right: 30,
  },
  btn_icon: {
    fontSize: 20,
    color: "white",
    marginRight: 8,
  },
  btn_text: {
    fontFamily: "Snow",
    fontSize: 17,
    color: "white",
  },
});

export default Home;
