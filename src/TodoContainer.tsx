import { Box, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { TodoContract } from "./App.types";
import Todo from "./Todo";

interface TodoContainerProps {
    todos: TodoContract[];
    handleChecked: (id: string) => void;
    handleDelete: (id: string) => void;
}

const TodoContainer: FC<TodoContainerProps> = (props) => {
  return (
    <Container sx={{ padding: "1rem" }}>
      {props.todos.length > 0 ? (
        <Grid container spacing={1}>
          {props.todos.map((todo) => (
            <Grid key={todo.id} item xs={12}>
              <Todo
                {...todo}
                handleChecked={() => props.handleChecked(todo.id)}
                handleDelete={() => props.handleDelete(todo.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">No todos yet</Typography>
        </Box>
      )}
    </Container>
  );
};

export default TodoContainer;
