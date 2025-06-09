import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TaskDetail } from "./TaskDetail";
import { TaskForm } from "./TaskForm";
import { formatTime } from "../utils/helper";
import { TIMER_TYPES } from "../utils/constants";

export const TaskList = ({
  timerType,
  currentTask,
  setCurrentTask,
  taskList,
  setTaskList,
}) => {
  const [editId, setEditId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const getFinishAt = () => {
    let totalTimeInMinutes;
    if (timerType === TIMER_TYPES.POMODORO) {
      totalTimeInMinutes = 25;
    } else if (timerType === TIMER_TYPES.SHORT_BREAK) {
      totalTimeInMinutes = 5;
    } else {
      totalTimeInMinutes = 15;
    }
    const finish = new Date(Date.now() + totalTimeInMinutes * 60 * 1000);
    const hours = formatTime(finish.getHours());
    const minutes = formatTime(finish.getMinutes());
    const duration = (totalTimeInMinutes / 60).toFixed(1);
    return { hours, minutes, duration };
  };

  const finishAt = getFinishAt();

  return (
    <>
      <Box sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "14px",
            borderBottom: "2px solid rgba(255, 255, 255, 0.6)",
            marginBottom: "18px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Tasks
          </Typography>
          <IconButton
            aria-label="more-vert"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginBottom: "12px",
          }}
        >
          {taskList.map((task) => (
            <TaskDetail
              key={task.id}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              task={task}
              taskList={taskList}
              setTaskList={setTaskList}
              editId={editId}
              setEditId={setEditId}
              setOpenForm={setOpenForm}
            />
          ))}
        </Box>
        {openForm ? (
          <TaskForm
            setTaskList={setTaskList}
            setEditId={setEditId}
            setOpenForm={setOpenForm}
          />
        ) : (
          <Button
            onClick={() => {
              setEditId(null);
              setOpenForm(true);
            }}
            variant="contained"
            startIcon={<AddCircleIcon sx={{ width: "22px", height: "22px" }} />}
            sx={{
              width: "100%",
              height: "64px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "white",
              borderRadius: 2,
              border: "2px dashed rgba(255, 255, 255, 0.4)",
              fontSize: "16px",
              textTransform: "capitalize",
              boxShadow: "none",
              opacity: 0.7,
              transition: "opacity 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "none",
                opacity: 1,
              },
            }}
          >
            Add Task
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(255,255,255,0.1)",
          marginTop: "28px",
          padding: "18px 12px",
          borderTop: "1px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Roboto",
            fontSize: "16px",
          }}
        >
          Pomos:
          <Typography
            variant="h4"
            sx={{
              marginLeft: 1,
              marginRight: 0.3,
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            {currentTask?.pomodoroCount}
          </Typography>
          /
          <Typography
            variant="h4"
            sx={{
              marginLeft: 0.3,
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            {currentTask?.totalPomodoro}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Roboto",
            fontSize: "16px",
          }}
        >
          Finish At:
          <Typography
            variant="h4"
            sx={{
              marginLeft: 1,
              marginRight: 0.8,
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            {finishAt.hours}:{finishAt.minutes}
          </Typography>
          ({finishAt.duration}h)
        </Box>
      </Box>
    </>
  );
};
