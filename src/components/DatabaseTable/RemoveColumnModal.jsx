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

export default function RemoveColumnModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const [columnName, setColumnName] = useState("");

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_SITES_COLUMN", payload: { columnName } });
    handleClose();
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
            Remove Column
          </Typography>
          <TextField
            label="Column Name"
            value={columnName}
            onChange={() => setColumnName(event.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Remove Column
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
