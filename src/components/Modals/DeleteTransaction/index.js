import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Context from "../../../context";

const DeleteTransaction = () => {
  const { setIsDeleteModalOpen, handleDeleteTransaction } = useContext(Context);

  return (
    <Dialog onClose={() => setIsDeleteModalOpen(false)} open>
      <DialogTitle>Excluir transação</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir esta transação?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
        <Button onClick={handleDeleteTransaction}>Excluir</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTransaction;
