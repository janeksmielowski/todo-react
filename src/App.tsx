import { Add } from "@mui/icons-material";
import { AppBar, Box, Fab, Toolbar, Tooltip, Typography } from "@mui/material";
import { useMachine } from "@xstate/react";
import { FC } from "react";
import AddTodoModal from "./AddTodoModal";
import appMachine from "./App.state";
import DeleteTodoModal from "./DeleteTodoModal";
import TodoContainer from "./TodoContainer";

const App: FC = () => {
  const [state, send] = useMachine(appMachine);
  const {
    context: { todos },
  } = state;

  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My Todos</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TodoContainer
        todos={todos}
        handleChecked={(id) => send("TOGGLE_TODO", { todoId: id })}
        handleDelete={(id) => send("CHOOSE_DELETE_TODO", { todoId: id })}
      />
      <Tooltip title="Add todo">
        <Fab
          data-testid="open-add-todo-modal-button"
          color="primary"
          onClick={() => send("CHOOSE_ADD_TODO")}
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        >
          <Add />
        </Fab>
      </Tooltip>
      <AddTodoModal
        open={state.value === "addTodo"}
        handleClose={() => send("CANCEL")}
        handleSubmit={(text) => send("ADD_TODO", { todoText: text })}
      />
      <DeleteTodoModal
        open={state.value === "deleteTodo"}
        handleClose={() => send("CANCEL")}
        handleSubmit={() => send("DELETE_TODO")}
      />
    </Box>
  );
};

export default App;
