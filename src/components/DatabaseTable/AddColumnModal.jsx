import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function AddColumnModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const [newColumnName, setNewColumnName] = useState("");

  const handleSubmit = () => {
    dispatch({ type: "ADD_COLUMN", payload: { newColumnName } });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add column
          </Typography>
          <TextField
            label="Column Name"
            value={newColumnName}
            onChange={() => setNewColumnName(event.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add Column
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
