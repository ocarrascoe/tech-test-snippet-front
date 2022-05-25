import React, {FC, ReactElement, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {BookList} from "../components/books";
import AddIcon from '@mui/icons-material/Add';
import BooksService from "../services/books.service";
import {IBook} from "../interfaces";
import {AddBookDialog} from "../components/books";


export const Books: FC = (): ReactElement => {
  useEffect(() => {
    console.log('Books render')
    getBooks()
  }, []);

  const [bookList, setBookList] = useState<IBook[]>([]);
  const [openAddBookDialog, setOpenAddBookDialog] = React.useState(false);


  function getBooks() {
    console.log('Getting Books')
    BooksService.getBooks().then((response: any) => {
      setBookList(response.data)
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const handleAddBook = () => {
    setOpenAddBookDialog(!openAddBookDialog)
  }

  const handleDialogCallback = () => {
    getBooks()
  }

  return (
    <>
      <AddBookDialog openFromParent={openAddBookDialog} parentCallback={handleDialogCallback}/>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        mb={2}
      >
        <Typography variant="h4">Books List</Typography>
        <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleAddBook}>Add Book</Button>
      </Box>
      <Box>
        <BookList bookList={bookList} parentCallback={handleDialogCallback}/>
      </Box>
    </>
  );
};