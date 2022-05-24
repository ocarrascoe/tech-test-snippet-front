import React, {FC, ReactElement, useEffect} from "react";
import {Box, Button, Chip, Divider, Grid, Modal, TextField, Typography} from "@mui/material";
import {useForm} from 'react-hook-form';
import booksService from "../../services/books.service";
import {ErrorOutline} from "@mui/icons-material";
import {ICreateBook, IEditBook} from "../../interfaces";
import LoadingButton from '@mui/lab/LoadingButton';

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

export const EditBookDialog: FC<Props> = ({openFromParent, parentCallback, book}): ReactElement => {
  const [openEditBookDialog, setOpenEditBookDialog] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<ICreateBook>();
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [price, setPrice] = React.useState("0.0");
  const [shouldDisable, setShouldDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log('openFromParent EditBookDialog', openFromParent)
    console.log('book from parent: ', book)
    handleEditBook(openFromParent)
  }, [openFromParent]);

  const handleEditBook = (open: boolean = false) => {
    console.log('before handleEditBook:', open)
    setOpenEditBookDialog(open)
    if (!open) {
      parentCallback()
    }
    console.log('openEditBookDialog:', openEditBookDialog)
    console.log('after handleEditBook:', open)
  }

  const onEditBook = async ({
                              titulo,
                              editorial,
                              autor,
                              genero,
                              paisautor,
                              numeropaginas,
                              anoedicion,
                              precio
                            }: IEditBook) => {
    setShowError(false);
    setLoading(true);
    setShouldDisable(true);
    await booksService.editBook({
      titulo,
      editorial,
      autor,
      genero,
      paisautor,
      numeropaginas,
      anoedicion,
      precio
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
              <Typography variant='h3' component="h3">Edit Book</Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                label="Title"
                variant="outlined"
                fullWidth
                {...register('titulo', {
                  required: 'This field is required',
                })}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Editorial"
                variant="outlined"
                fullWidth
                {...register('editorial', {
                  required: 'This field is required',
                })}
                error={!!errors.editorial}
                helperText={errors.editorial?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                label="Author"
                variant="outlined"
                fullWidth
                {...register('autor', {
                  required: 'This field is required',
                })}
                error={!!errors.autor}
                helperText={errors.autor?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                label="Genre"
                variant="outlined"
                fullWidth
                {...register('genero', {
                  required: 'This field is required',
                })}
                error={!!errors.genero}
                helperText={errors.genero?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                label="Author's Country"
                variant="outlined"
                fullWidth
                {...register('paisautor', {
                  required: 'This field is required',
                })}
                error={!!errors.paisautor}
                helperText={errors.paisautor?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                label="Number of Pages"
                variant="outlined"
                fullWidth
                {...register('numeropaginas', {
                  required: 'This field is required',
                })}
                error={!!errors.numeropaginas}
                helperText={errors.numeropaginas?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                label="Year of Edition"
                variant="outlined"
                fullWidth
                {...register('anoedicion', {
                  required: 'This field is required',
                })}
                error={!!errors.anoedicion}
                helperText={errors.anoedicion?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                label="Price"
                value={price}
                variant="outlined"
                fullWidth
                inputProps={{
                  maxLength: 13,
                  step: "1"
                }}
                {...register('precio', {
                  required: 'This field is required',
                })}
                onChange={(e) => setPrice(parseFloat(e.target.value).toFixed(2))}
                error={!!errors.precio}
                helperText={errors.precio?.message}
              />
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
                             loading={loading} disabled={shouldDisable}>Edit Book</LoadingButton>
              <Button variant='outlined' style={{color: 'red'}} onClick={() => handleEditBook(false)}>Cancel</Button>
            </Grid>

          </Grid>
        </Box>
      </form>
    </Modal>
  );
};