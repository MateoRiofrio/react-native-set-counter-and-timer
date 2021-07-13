import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";

function Timer({ interval, style }) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}.</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  );
}

function RoundButton({
  title,
  color,
  background,
  onPress,
  onLongPress,
  disabled,
}) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      onLongPress={() => !disabled && onLongPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ButtonRow({ children }) {
  return <View style={styles.buttonRow}>{children}</View>;
}

function SetTitle({ number }) {
  return (
    <View style={styles.setWrapper}>
      <Text style={styles.setTitle}>Set: {number}</Text>
    </View>
  );
}

function SetRow({ number, time }) {
  return (
    <View style={styles.set}>
      <Text style={styles.setText}>Set {number} </Text>
      <Timer style={styles.setText} interval={time}></Timer>
    </View>
  );
}
function SetsTable({ sets }) {
  return (
    <ScrollView style={styles.scrollView}>
      {sets.map((time, index) => (
        <SetRow key={sets.length - index} number={sets.length - index} time={time == sets[sets.length - 1] ? time : time - sets[index + 1]} />
      ))}
    </ScrollView>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      set: 1,
      sets: [],
      isTimerOn: false,
      isRunning: false,
      prevTime: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now: now,
      isTimerOn: true,
      isRunning: true,
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 35);
  };

  stop = () => {
    this.setState((prevState) => {
      return {
        isTimerOn: false,
        prevTime: prevState.now - prevState.start,
      };
    });
    clearInterval(this.timer);
  };

  resume = () => {
    const now = new Date().getTime();
    this.setState((prevState) => {
      return {
        start: now,
        now: now + prevState.prevTime,
        isTimerOn: true,
        isRunning: true,
      };
    });
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        return { now: new Date().getTime() + prevState.prevTime };
      });
    }, 35);
  };

  addSet = () => {
    this.setState((prevState) => {
      let currTime = (this.state.now - this.state.start)
      return {
        set: prevState.set + 1,
        sets: [currTime, ...prevState.sets],
      };
    });
  };

  resetSets = () => {
    this.setState({
      set: 1,
      sets: [],
    });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      start: 0,
      now: 0,
      isTimerOn: false,
      isRunning: false,
      prevTime: 0,
    });
  };

  render() {
    const { now, start, set, sets, isTimerOn, isRunning } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <Timer
          interval={timer}
          style={styles.timer}
        />
        <SetTitle number={set} />

        {!isTimerOn && !isRunning && (
          <ButtonRow>
            <RoundButton
              title="Set"
              color="#FFFF"
              background="#3D3D3D"
              onPress={this.addSet}
              onLongPress={this.resetSets}
              delayLongPress={1500}
            />
            <RoundButton
              title="Start"
              color="#50D167"
              background="#1b361f"
              onPress={this.start}
            />
          </ButtonRow>
        )}

        {isRunning && !isTimerOn && (
          <ButtonRow>
            <RoundButton
              title="Reset"
              color="#FFFF"
              background="#3D3D3D"
              onPress={this.resetTimer}
            />
            <RoundButton
              title="Start"
              color="#50D167"
              background="#1b361f"
              onPress={this.resume}
            />
          </ButtonRow>
        )}

        {isTimerOn && (
          <ButtonRow>
            <RoundButton
              title="Set"
              color="#FFFF"
              background="#3D3D3D"
              onPress={this.addSet}
              onLongPress={this.resetSets}
              delayLongPress={1500}
            />
            <RoundButton
              title="Stop"
              color="#E33935"
              background="#3C1715"
              onPress={this.stop}
            />
          </ButtonRow>
        )}

        <SetsTable sets={sets}></SetsTable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingTop: "30%",
    paddingHorizontal: 20,
  },
  timer: {
    color: "#FFF",
    fontSize: 76,
    fontWeight: "200",
    width: 110,
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: "20%",
    marginBottom: "4%",
  },
  setWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  setTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "200",
  },
  setText: {
    color: "#FFFF",
    fontSize: 18,
  },
  set: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#151515",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: "stretch",
  },
});
