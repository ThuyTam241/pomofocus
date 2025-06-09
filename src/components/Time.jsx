import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { formatTime } from "../utils/helper";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { TIME_SETTINGS, TIMER_TYPES } from "../utils/constants";
import { TaskList } from "./TaskList";

export const Time = ({ color, setColor }) => {
  const [time, setTime] = useState(TIME_SETTINGS.POMODORO);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState(TIMER_TYPES.POMODORO);
  const ref = useRef(null);
  const [taskList, setTaskList] = useState([
    { id: 1, title: "2", pomodoroCount: 0, totalPomodoro: 1, done: false },
    { id: 2, title: "3", pomodoroCount: 0, totalPomodoro: 6, done: true },
  ]);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [currentTask, setCurrentTask] = useState(taskList[0] || null);

  const handleChange = (event, newTab) => {
    setTimerType(newTab);
    clearInterval(ref.current);
    setIsRunning(false);
    if (newTab === TIMER_TYPES.POMODORO) {
      setTime(TIME_SETTINGS.POMODORO);
    } else if (newTab === TIMER_TYPES.SHORT_BREAK) {
      setTime(TIME_SETTINGS.SHORT_BREAK);
    } else {
      setTime(TIME_SETTINGS.LONG_BREAK);
    }
  };

  useEffect(() => {
    const favicon = document.querySelector(`link[rel="icon"]`);
    if (timerType === TIMER_TYPES.POMODORO) {
      setColor("#ba4949");
      favicon?.setAttribute("href", "/pomodoro.svg");
    } else if (timerType === TIMER_TYPES.SHORT_BREAK) {
      setColor("#38858a");
      favicon?.setAttribute("href", "/short-break.svg");
    } else {
      setColor("#397097");
      favicon?.setAttribute("href", "/long-break.svg");
    }
  }, [timerType]);

  useEffect(() => {
    let title = "";

    if (timerType === TIMER_TYPES.POMODORO) {
      title = `${time.minutes}:${formatTime(time.seconds)} - ${
        currentTask?.title || "Time to focus!"
      }`;
    } else if (timerType === TIMER_TYPES.SHORT_BREAK) {
      title = `${time.minutes}:${formatTime(time.seconds)} - Time for a break!`;
    } else {
      title = `${time.minutes}:${formatTime(time.seconds)} - Time for a break!`;
    }

    document.title = title;
  }, [time]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      ref.current = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          if (minutes === 0 && seconds === 0) {
            handleNext();
            return prevTime;
          }
          if (seconds === 0) {
            return { minutes: minutes - 1, seconds: 59 };
          }
          return { minutes, seconds: seconds - 1 };
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    setIsRunning(false);
  };

  const handleNext = () => {
    clearInterval(ref.current);
    setIsRunning(false);
    if (timerType === TIMER_TYPES.POMODORO) {
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === currentTask?.id
            ? { ...task, pomodoroCount: pomodoroCount + 1 }
            : task
        )
      );
      setCurrentTask((prev) => ({
        ...prev,
        pomodoroCount: prev.pomodoroCount + 1,
      }));
      const nextTimeType = pomodoroCount + 1;
      setPomodoroCount(nextTimeType);
      if (nextTimeType % 3 === 0) {
        setTimerType(TIMER_TYPES.LONG_BREAK);
        setTime(TIME_SETTINGS.LONG_BREAK);
        alert("Pomodoro finished! Time for a long break");
      } else {
        setTimerType(TIMER_TYPES.SHORT_BREAK);
        setTime(TIME_SETTINGS.SHORT_BREAK);
        alert("Pomodoro finished! Time for a short break");
      }
    } else if (
      timerType === TIMER_TYPES.SHORT_BREAK ||
      timerType === TIMER_TYPES.LONG_BREAK
    ) {
      setTimerType(TIMER_TYPES.POMODORO);
      setTime(TIME_SETTINGS.POMODORO);
      alert("Break is over. Time to focus!");
    }
  };

  return (
    <Box sx={{ width: "480px", margin: "auto" }}>
      <Box
        sx={{
          position: "relative",
          p: "20px 0",
          paddingBottom: 4,
          backgroundColor: "rgb(255,255,255,0.1)",
          borderRadius: 1.5,
          dislay: "flex",
          flexDirection: "column",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2.5,
          }}
        >
          <Tabs
            value={timerType}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "inherit",
              },
              "& .MuiButtonBase-root.MuiTab-root": {
                color: "white",
                textTransform: "capitalize",
                fontWeight: "normal",
                fontSize: "16px",
                "&.Mui-selected": {
                  backgroundColor: "rgba(0, 0, 0, 0.15)",
                  p: "2px 12px",
                  borderRadius: 1,
                  transition: "background-color 0.3s ease-in-out",
                  fontWeight: "bold",
                },
              },
            }}
          >
            <Tab label="Pomodoro" value={TIMER_TYPES.POMODORO} />
            <Tab label="Short Break" value={TIMER_TYPES.SHORT_BREAK} />
            <Tab label="Long Break" value={TIMER_TYPES.LONG_BREAK} />
          </Tabs>
        </Box>
        <Typography
          variant="h1"
          sx={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "120px" }}
        >
          {formatTime(time.minutes)} : {formatTime(time.seconds)}
        </Typography>
        <Button
          variant="contained"
          onClick={isRunning ? pauseTimer : startTimer}
          sx={{
            width: "200px",
            height: "55px",
            backgroundColor: "#FFFFFF",
            color: color,
            marginTop: 2.5,
            fontSize: "20px",
            fontWeight: 600,
            boxShadow: isRunning
              ? "0 0 #000"
              : "rgb(235, 235, 235) 0px 6px 0px",
            "&:hover": {
              boxShadow: isRunning
                ? "0 0 #000"
                : "rgb(235, 235, 235) 0px 6px 0px",
            },
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        {isRunning && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              bottom: "28px",
              right: "72px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <SkipNextIcon
              sx={{
                color: "#FFF",
                fontSize: 48,
                opacity: isRunning ? 0.9 : 0,
                transition: "opacity 0.2s ease-in-out",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            />
          </IconButton>
        )}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: "#FFFFFF",
          fontWeight: 500,
          fontSize: "16px",
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        #{pomodoroCount + 1}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#FFFFFF",
          fontWeight: 400,
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        {currentTask?.title || "Time to focus"}
      </Typography>
      <TaskList
        timerType={timerType}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </Box>
  );
};
