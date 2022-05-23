import React, {FC, ReactElement, useEffect} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  openFromParent?: boolean;
  parentCallback: any;
}

export const AddBookDialog: FC<Props> = ({openFromParent, parentCallback}): ReactElement => {
  useEffect(() => {
    console.log('openFromParent AddBookDialog', openFromParent)
    handleAddBook(openFromParent)
  }, [openFromParent]);

  const [openAddBookDialog, setOpenAddBookDialog] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = React.useState(false);
  
  const handleAddBook = (open: boolean = false) => {
    setOpenAddBookDialog(open)
    if(!open) {
      parentCallback()
    }
  }

  return (
    <Modal
      open={openAddBookDialog}
      onClose={parentCallback}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Box mt={2} sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: " space-around",
          alignItems: "center",
        }}>
          <Button variant='outlined' style={{color: 'green'}}>Add Book</Button>
          <Button variant='outlined' style={{color: 'red'}} onClick={() => handleAddBook(false)}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};