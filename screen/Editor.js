import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Bar } from "react-native-progress";
import { useTimer } from "use-timer";
import { BLACK, LIGHT_GREY, RED } from "../color";
import { useState } from "react";
import { RichEditor } from "react-native-pell-rich-editor";
import { useContext } from "react";
import { DBContext } from "../context";

const Editor = ({ navigation }) => {
  const realm = useContext(DBContext);
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const isTextExist = () => (title || mainText ? true : false);

  const { time: second, start } = useTimer({
    initialTime: 300,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      if (!isTextExist()) {
        return navigation.navigate("Home");
      }
      saveText();
      Alert.alert("글이 자동 저장되었습니다.");
    },
  });

  const chevronButtonAlert = () => {
    if (!isTextExist()) {
      return navigation.navigate("Home");
    }
    Alert.alert(
      "저장하지 않고 나갈까요?",
      "현재 작성 내용은 모두 삭제됩니다.",
      [
        {
          text: "취소",
        },
        {
          text: "나가기",
          style: "destructive",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  const CheckButtonAlert = () => {
    if (!isTextExist()) {
      return navigation.navigate("Home");
    }
    Alert.alert("저장할까요?", "저장한 이후에는 수정할 수 없어요.", [
      {
        text: "취소",
      },
      { text: "저장", onPress: () => saveText() },
    ]);
  };

  const saveText = () => {
    realm.write(() => {
      realm.create("Document", {
        _id: Date.now(),
        title,
        mainText,
        timeStamp: `${new Intl.DateTimeFormat("ko-KR", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(Date.now())}`,
      });
    });
    navigation.navigate("Home");
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
        <TouchableOpacity onPress={chevronButtonAlert}>
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
        <TouchableOpacity onPress={CheckButtonAlert}>
          <Ionicons name="checkmark" color="black" style={styles.check} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.textInput}>
        <TextInput
          style={styles.title}
          placeholder="제목을 입력하세요"
          fontSize={30}
          placeholderTextColor={LIGHT_GREY}
          autoCorrect={false}
          onChange={start}
          onChangeText={(text) => setTitle(text)}
        />
        <RichEditor
          editorStyle={{ backgroundColor: "#F2F2F2" }}
          style={styles.mainText}
          placeholder={"본문을 입력하세요"}
          onChange={(text) => setMainText(text)}
          onKeyDown={start}
          usecontainer={true}
          initialHeight={600}
        />
      </ScrollView>
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
    fontFamily: "Mapo",
    textAlignVertical: "top",
  },
});

export default Editor;
