import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Bar } from "react-native-progress";
import { useTimer } from "use-timer";
import { BLACK, LIGHT_GREY, RED } from "../color";
import { useState } from "react";

const Editor = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const {
    time: second,
    start,
    status,
  } = useTimer({
    initialTime: 300,
    endTime: 0,
    timerType: "DECREMENTAL",
  });
  const isTextExist = () => (title || mainText ? true : false);

  const buttonAlert = () => {
    if (isTextExist()) {
      return Alert.alert("저장할까요?", "저장한 이후에는 수정할 수 없어요.", [
        {
          text: "취소",
        },
        { text: "저장", onPress: () => saveText() },
      ]);
    }
    return navigation.navigate("Home");
  };

  const saveText = () => {
    console.log("saved");
  };
  return (
    <View>
      <Bar
        progress={second / 300}
        width={null}
        height={50}
        borderWidth={0}
        borderRadius={0}
        color={RED}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={buttonAlert}>
          <Entypo
            name="chevron-thin-left"
            style={styles.chevron}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {Math.floor(second / 60).toString()} :{" "}
            {Math.floor(second % 60)
              .toString()
              .padStart(2, "0")}
          </Text>
        </View>
        <TouchableOpacity onPress={buttonAlert}>
          <Ionicons name="checkmark" color="black" style={styles.check} />
        </TouchableOpacity>
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.title}
          placeholder="제목을 입력하세요"
          fontSize={30}
          placeholderTextColor={LIGHT_GREY}
          autoCorrect={false}
          onChange={start}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.mainText}
          multiline
          placeholder="본문을 입력하세요"
          fontSize={20}
          placeholderTextColor={LIGHT_GREY}
          autoCorrect={false}
          onChange={start}
          onChangeText={setMainText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
    fontFamily: "Snow",
  },
  chevron: {
    fontSize: 28,
    marginTop: 3,
  },
  check: {
    fontSize: 35,
  },
  timerContainer: {
    width: 130,
    paddingLeft: 32,
  },
  timer: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: "400",
  },
  textInput: {
    height: "100%",
    paddingHorizontal: 17,
  },
  title: {
    height: 55,
    color: BLACK,
    fontFamily: "Snow",
  },
  mainText: {
    height: "70%",
    fontFamily: "Mapo",
  },
});

export default Editor;
