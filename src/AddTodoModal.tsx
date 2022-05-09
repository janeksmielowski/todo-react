import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { FC, useState } from "react";

interface AddTodoModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (text: string) => void;
}

const AddTodoModal: FC<AddTodoModalProps> = (props) => {
  const [text, setText] = useState<string>();
  const [showError, setShowError] = useState(false);

  const clearState = () => {
    setText(undefined);
    setShowError(false);
  };

  const handleClose = () => {
    clearState();
    props.handleClose();
  };

  const handleValidation = (newText?: string) => {
    setShowError(newText !== undefined && newText.trim().length === 0);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    handleValidation(newText);
  };

  const handleAddTodo = () => {
    if (text && text.trim().length > 0) {
      clearState();
      props.handleSubmit(text);
    } else {
      setShowError(true);
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent data-testid="add-todo-modal-content">
        <TextField
          autoFocus
          error={showError}
          fullWidth
          helperText={showError && "Todo cannot be empty"}
          id="add-todo-input"
          inputProps={{ "data-testid": "add-todo-input" }}
          label="Todo"
          margin="dense"
          onBlur={() => handleValidation(text)}
          onChange={handleChange}
          onFocus={() => setText("")}
          placeholder="What do you want to do?"
          type="text"
          value={text || ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button data-testid="add-todo-submit-button" onClick={handleAddTodo}>
          Add todo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoModal;
