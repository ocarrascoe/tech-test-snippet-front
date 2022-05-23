import React, {FC, ReactElement} from "react";
import {Box, Button, Typography} from "@mui/material";
import {BookList} from "../components/books";
import AddIcon from '@mui/icons-material/Add';


export const Books: FC<any> = (): ReactElement => {
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
        <Button variant="outlined" startIcon={<AddIcon />}>Add Book</Button>
      </Box>
      <Box>
        <BookList/>
      </Box>
    </>
  );
};