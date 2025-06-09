import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const TaskForm = ({
  currentTask,
  setCurrentTask,
  taskList,
  setTaskList,
  editId,
  setEditId,
  setOpenForm,
}) => {
  const [title, setTitle] = useState("");
  const [totalPomodoro, setTotalPomodoro] = useState(0);

  useEffect(() => {
    if (!editId) return;
    const selectedTask = taskList.find((task) => task.id === editId);
    setTitle(selectedTask?.title || "");
    setTotalPomodoro(selectedTask?.totalPomodoro || 0);
  }, [editId, taskList]);

  const handleSave = () => {
    if (editId) {
      setTaskList((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, title, totalPomodoro } : t))
      );
      if (currentTask?.id === editId) {
        setCurrentTask((prev) => ({ ...prev, title, totalPomodoro }));
      }
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        pomodoroCount: 0,
        totalPomodoro,
        done: false,
      };
      setTaskList((prev) => [...prev, newTask]);
    }
    setOpenForm(false);
  };

  return (
    <Box sx={{ borderRadius: 1.5, overflow: "hidden" }}>
      <Box sx={{ backgroundColor: "white", padding: "16px" }}>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          type="text"
          placeholder="What are you working on?"
          className="input-field"
        />
        <Box sx={{ margin: "8px 0" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#555",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            Est Pomodoros
          </Typography>
          <Box sx={{ width: "fit-content" }}>
            <input
              value={totalPomodoro}
              onChange={(event) => setTotalPomodoro(event.target.value)}
              type="number"
              min="0"
              step="1"
              className="input-pomo"
            />
          </Box>
          <Box sx={{ width: "fit-content", marginTop: 2 }}>
            <Button
              variant="text"
              sx={{
                textDecoration: "underline",
                textTransform: "capitalize",
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.4)",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                  color: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              + Add note
            </Button>
            <Button
              variant="text"
              sx={{
                textDecoration: "underline",
                textTransform: "capitalize",
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.4)",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                  color: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              + Add project
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "10px 20px",
          backgroundColor: "rgb(239, 239, 239)",
          display: "flex",
        }}
      >
        {editId && (
          <Button
            onClick={() =>
              setTaskList((prev) => prev.filter((t) => t.id !== editId))
            }
            variant="text"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "transparent",
              color: "rgba(0, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            Delete
          </Button>
        )}
        <Box sx={{ marginLeft: "auto" }}>
          <Button
            onClick={() => {
              editId && setEditId(null);
              setOpenForm(false);
            }}
            variant="text"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "transparent",
              color: "rgba(0, 0, 0, 0.4)",
              marginRight: "14px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#222",
              color: "white",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
