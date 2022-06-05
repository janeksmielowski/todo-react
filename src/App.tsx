import { Add } from "@mui/icons-material";
import { AppBar, Box, CircularProgress, Container, Fab, Tab, Tabs, Toolbar, Tooltip, Typography } from "@mui/material";
import { useMachine } from "@xstate/react";
import { FC, useState } from "react";
import AddTodoModal from "./AddTodoModal";
import appMachine from "./App.state";
import DeleteTodoModal from "./DeleteTodoModal";
import TodoContainer from "./TodoContainer";

enum TabVariant {
  Todo,
  Done,
  All
}

const App: FC = () => {
  const [state, send] = useMachine(appMachine);

  const {
    context: { todos },
  } = state;

  const [tabIndex, setTabIndex] = useState(TabVariant.Todo);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const getFilteredTodos = () => {
    switch (tabIndex) {
      case TabVariant.Todo:
        return todos.filter(todo => !todo.done);
      case TabVariant.Done:
        return todos.filter(todo => todo.done);
      case TabVariant.All:
      default:
        return todos;
    }
  };
  
  const shouldRenderLoader = (state.value as string).match(/(init|loading)/);

  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My Todos</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="To do"/>
          <Tab label="Done"/>
          <Tab label="All"/>
        </Tabs>
      </Container>
      <TodoContainer
        todos={getFilteredTodos()}
        handleChecked={(id) => send("CHOOSE_TOGGLE_TODO", { todoId: id })}
        handleDelete={(id) => send("CHOOSE_DELETE_TODO", { todoId: id })}
      />
      {shouldRenderLoader && (
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
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
