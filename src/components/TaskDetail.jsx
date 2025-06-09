import { Box, IconButton, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TaskForm } from "./TaskForm";

export const TaskDetail = ({
  currentTask,
  setCurrentTask,
  task,
  taskList,
  setTaskList,
  editId,
  setEditId,
  setOpenForm,
}) => {
  return editId === task.id ? (
    <TaskForm
      currentTask={currentTask}
      setCurrentTask={setCurrentTask}
      taskList={taskList}
      setTaskList={setTaskList}
      editId={editId}
      setEditId={setEditId}
      setOpenForm={setOpenForm}
    />
  ) : (
    <Box
      onClick={() => setCurrentTask(task)}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 1.5,
        padding: "16px",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .child": {
          backgroundColor: task.id === currentTask?.id ? "#000" : "#DFDFDF",
        },
      }}
    >
      <Box
        className="child"
        sx={{
          position: "absolute",
          width: 6,
          top: 0,
          left: 0,
          bottom: 0,
          transition: "background-color 0.2s ease-in-out",
          backgroundColor: task.id === currentTask?.id ? "#000" : "#FFF",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <IconButton
          aria-label="check-circle"
          onClick={(event) => {
            event.stopPropagation();
            setTaskList((prev) =>
              prev.map((t) => (t.id == task.id ? { ...t, done: !t.done } : t))
            );
          }}
          sx={{
            padding: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <CheckCircleIcon
            sx={{
              color: task.done ? "#ba4949" : "#DFDFDF",
              width: "26px",
              height: "26px",
              "&:hover": {
                opacity: 0.6,
              },
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            textDecorationLine: task.done ? "line-through" : "none",
            color: task.done ? "#AAA" : "#555",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          {task.title || "Time to focus"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: 600,
          color: "#AAA",
          gap: "18px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#AAA",
          }}
        >
          {task.pomodoroCount}/{task.totalPomodoro}
        </Typography>
        <IconButton
          aria-label="show-task"
          onClick={(event) => {
            event.stopPropagation();
            setEditId(task.id);
            setOpenForm(false);
          }}
          sx={{
            backgroundColor: "white",
            border: "1px solid rgb(223, 223, 223)",
            borderRadius: 1,
            padding: "2px",
            color: "#AAA",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
