import {
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

const Editor = ({ navigation }) => {
  const { time, start } = useTimer({
    initialTime: 100,
    timerType: "DECREMENTAL",
  });

  return (
    <View>
      <Bar
        progress={1}
        width={null}
        height={50}
        borderWidth={0}
        borderRadius={0}
        color={RED}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Entypo
            name="chevron-thin-left"
            style={styles.chevron}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.timer}>{time}</Text>
        <TouchableOpacity>
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
        />
        <TextInput
          style={styles.mainText}
          multiline
          placeholder="본문을 입력하세요"
          fontSize={20}
          placeholderTextColor={LIGHT_GREY}
          autoCorrect={false}
          onChange={start}
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
