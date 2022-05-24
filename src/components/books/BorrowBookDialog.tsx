import React, {FC, ReactElement, useEffect, useState} from "react";
import {Box, Button, Chip, Divider, Grid, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import {useForm} from 'react-hook-form';
import {ErrorOutline} from "@mui/icons-material";
import {IEditBook, IUser} from "../../interfaces";
import LoadingButton from '@mui/lab/LoadingButton';
import BorrowsService from "../../services/borrows.service";
import UsersService from "../../services/users.service";


const dialogStyle = {
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
  book: any;
  openFromParent?: boolean;
  parentCallback: any;
}

interface FormData {
  user_id: number;
}

export const BorrowBookDialog: FC<Props> = ({openFromParent, parentCallback, book}): ReactElement => {
  const [openEditBookDialog, setOpenEditBookDialog] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [shouldDisable, setShouldDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userList, setUserList] = useState<IUser[]>([]);
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: {
      user_id: 0,
    }
  });


  useEffect(() => {
    console.log('openFromParent EditBookDialog', openFromParent);
    console.log('book from parent: ', book);
    setShowError(false)
    handleEditBook(openFromParent);
    getUsers()
    getBookFromParent()
  }, [openFromParent]);

  function getUsers() {
    console.log('Getting Users')
    UsersService.getUsers().then((response: any) => {
      setUserList(response.data)
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const getBookFromParent = (): IEditBook => {
    return {
      titulo: book.titulo,
      editorial: book.editorial,
      autor: book.autor,
      genero: book.genero,
      paisautor: book.paisautor,
      numeropaginas: book.numeropaginas,
      anoedicion: book.anoedicion,
      precio: book.precio,
    }
  }

  const handleEditBook = (open: boolean = false) => {
    console.log('before handleEditBook:', open)
    setOpenEditBookDialog(open)
    if (!open) {
      parentCallback()
    }
    console.log('openEditBookDialog:', openEditBookDialog)
    console.log('after handleEditBook:', open)
  }

  const onEditBook = async ({user_id}: FormData) => {
    setShowError(false);
    setLoading(true);
    setShouldDisable(true);
    console.log('onEditBook user_id: ', user_id)
    await BorrowsService.createBorrow({
      user_id: user_id,
      book_id: book.codigolibro
    }).then((response: any) => {
      console.log('response: ', response)
      setLoading(false);
      setShouldDisable(false);
      handleEditBook(false)
    })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
        setShouldDisable(false);
        setShowError(true);
        setErrorMessage(e.response.data.error)
      });
  }

  return (
    <Modal
      open={openEditBookDialog}
      onClose={parentCallback}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit(onEditBook)} noValidate>
        <Box sx={dialogStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3' component="h3">Borrow Book</Typography>
            </Grid>

            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                id="user-select"
                label="User"
                variant="outlined"
                defaultValue={0}
                fullWidth
                {...register('user_id', {
                  required: 'This field is required',
                })}
                error={!!errors.user_id}
              >
                {userList.map((user) => (
                  <MenuItem key={user.codigousuario}
                            value={user.codigousuario}>{user.nombre + ' ' + user.apellido1 + ' ' + user.apellido2}</MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Chip
                label={errorMessage}
                color="error"
                icon={<ErrorOutline/>}
                className="fadeIn"
                sx={{display: showError ? 'flex' : 'none'}}
              />
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{width: '100%', mb: 2}}/>
              <LoadingButton type="submit" variant='outlined' style={{color: 'green', marginBottom: '4px'}}
                             loading={loading} disabled={shouldDisable}>Borrow book to this User</LoadingButton>
              <Button variant='outlined' style={{color: 'red'}} onClick={() => handleEditBook(false)}>Cancel</Button>
            </Grid>

          </Grid>
        </Box>
      </form>
    </Modal>
  );
};