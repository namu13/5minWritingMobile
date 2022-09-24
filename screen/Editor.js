import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Bar } from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../storage";
import { useTimer } from "use-timer";
import { BLACK, LIGHT_GREY, RED } from "../color";
import { useState, useRef } from "react";
import { RichEditor } from "react-native-pell-rich-editor";

const Editor = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const RichText = useRef();

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

  const chevronButtonAlert = () => {
    if (isTextExist()) {
      return Alert.alert(
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
    }
    navigation.navigate("Home");
  };

  const CheckButtonAlert = () => {
    if (isTextExist()) {
      return Alert.alert("저장할까요?", "저장한 이후에는 수정할 수 없어요.", [
        {
          text: "취소",
        },
        { text: "저장", onPress: () => saveText() },
      ]);
    }
    navigation.navigate("Home");
  };

  const saveText = () => {
    try {
      const time = new Date();

      const storedTextData = storage.getString("@text_data");

      console.log(JSON.stringify(storedTextData));

      if (storedTextData) {
        const newTextData = {
          ...storedTextData,
          [Date.now()]: {
            title,
            mainText,
            timeStamp: `${time.getFullYear()}.${time.getMonth()}.${time.getDate()}`,
          },
        };

        navigation.navigate("Home");
        return storage.set("@text_data", JSON.stringify(newTextData));
      }

      const textData = {
        [Date.now()]: {
          title,
          mainText,
          timeStamp: `${time.getFullYear()}.${time.getMonth()}.${time.getDate()}`,
        },
      };
      storage.set("@text_data", JSON.stringify(textData));
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }
  };

  // const saveText = async () => {
  //   try {
  //     const time = new Date();

  //     const storedTextData = await AsyncStorage.getItem("@TEXT_DATA");
  //     console.log(storedTextData);
  //     if (storedTextData) {
  //       const newTextData = {
  //         ...storedTextData,
  //         [Date.now()]: {
  //           title,
  //           mainText,
  //           timeStamp: `${time.getFullYear()}.${time.getMonth()}.${time.getDate()}`,
  //         },
  //       };
  //       navigation.navigate("Home");

  //       return await AsyncStorage.setItem(
  //         "@TEXT_DATA",
  //         JSON.stringify(newTextData)
  //       );
  //     }

  //     const textData = {
  //       [Date.now()]: {
  //         title,
  //         mainText,
  //         timeStamp: `${time.getFullYear()}.${time.getMonth()}.${time.getDate()}`,
  //       },
  //     };
  //     await AsyncStorage.setItem("@TEXT_DATA", JSON.stringify(textData));
  //     navigation.navigate("Home");
  //   } catch (e) {
  //     Alert.alert(JSON.stringify(e));
  //   }
  // };

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
          onChangeText={setTitle}
        />
        {/* <TextInput
          style={styles.mainText}
          multiline
          placeholder="본문을 입력하세요"
          fontSize={20}
          placeholderTextColor={LIGHT_GREY}
          autoCorrect={false}
          onChange={start}
          onChangeText={setMainText}
        /> */}
        <RichEditor
          // containerStyle={styles.mainText}
          style={styles.mainText}
          ref={RichText}
          placeholder={"본문을 입력하세요"}
          onChange={start}
          onChangeText={setMainText}
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
    // backgroundColor: "teal",
  },
  title: {
    height: 55,
    color: BLACK,
    fontFamily: "Snow",
  },
  mainText: {
    // minHeight: "70%",
    fontFamily: "Mapo",
    textAlignVertical: "top",
  },
});

export default Editor;
