import React, {FC, ReactElement, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {BookList} from "../components/books";
import AddIcon from '@mui/icons-material/Add';
import BooksService from "../services/books.service";
import {IBook} from "../interfaces";


export const Books: FC = (): ReactElement => {
  const [bookList, setBookList] = useState<IBook[]>([]);

  useEffect(() => {
    getBooks()
  }, []);

  function getBooks() {
    BooksService.getBooks().then((response: any) => {
        setBookList(response.data)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return (
    <>
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
        <Button variant="outlined" startIcon={<AddIcon/>}>Add Book</Button>
      </Box>
      <Box>
        <BookList bookList={bookList}/>
      </Box>
    </>
  );
};