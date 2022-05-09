import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface DeleteTodoModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const DeleteTodoModal: FC<DeleteTodoModalProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent data-testid="delete-todo-modal-content">
        <DialogContentText>
          Are you sure you want to delete this todo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button data-testid="delete-todo-submit-button" onClick={props.handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodoModal;
