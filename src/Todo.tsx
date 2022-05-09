import { Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Todo as TodoContract } from "./App.state";

interface TodoProps extends TodoContract {
  handleChecked: () => void;
  handleDelete: () => void;
}

const Todo: FC<TodoProps> = (props) => {
  return (
    <Paper
      data-testid="todo"
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Tooltip
          title={`Mark as ${props.completed ? "incompleted" : "completed"}`}
        >
          <Checkbox checked={props.completed} onChange={props.handleChecked} />
        </Tooltip>
        <Typography
          variant="body1"
          sx={{
            textDecoration: props.completed ? "line-through" : undefined,
          }}
        >
          {props.text}
        </Typography>
      </Box>
      <Tooltip title="Delete">
        <IconButton
          data-testid="open-delete-todo-modal-button"
          color="error"
          onClick={props.handleDelete}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default Todo;
