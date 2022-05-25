import * as React from 'react';
import {FC, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {IBook} from "../../interfaces";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import {EditBookDialog} from "./EditBookDialog";
import BooksService from "../../services/books.service";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import BorrowsService from "../../services/borrows.service";
import BookIcon from '@mui/icons-material/Book';
import {BorrowBookDialog} from "./BorrowBookDialog";

type ColumnHeader =
  'titulo'
  | 'editorial'
  | 'autor'
  | 'genero'
  | 'paisautor'
  | 'numeropaginas'
  | 'anoedicion'
  | 'precio'
  | 'is_available';

type AlignType = 'left' | 'center' | 'right';

interface Column {
  id: ColumnHeader;
  label: string;
  minWidth?: number;
  align?: AlignType;
  format?: (value: number) => string;
}


const columns: readonly Column[] = [
  {id: 'titulo', label: 'Title', minWidth: 200},
  {
    id: 'editorial',
    label: 'Editorial',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'autor',
    label: 'Author',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'genero',
    label: 'Genre',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'paisautor',
    label: "Author's Country",
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'numeropaginas',
    label: 'Number of Pages',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(0),
  },
  {
    id: 'anoedicion',
    label: 'Year of Edition',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'precio',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'is_available',
    label: 'Available',
    minWidth: 170,
    align: 'center',
  }
];


interface Data {
  codigolibro: number;
  titulo: string;
  editorial: string;
  autor: string;
  genero: string;
  paisautor: string;
  numeropaginas: number;
  anoedicion: string;
  precio: string;
  is_available: boolean;
}

function createData(
  codigolibro: number,
  titulo: string,
  editorial: string,
  autor: string,
  genero: string,
  paisautor: string,
  numeropaginas: number,
  anoedicion: string,
  precio: string,
  is_available: boolean
): Data {
  return {
    codigolibro,
    titulo,
    editorial,
    autor,
    genero,
    paisautor,
    numeropaginas,
    anoedicion,
    precio,
    is_available
  };
}

interface Props {
  bookList: IBook[];
  parentCallback: any;
}

export const BookList: FC<Props> = ({bookList, parentCallback}) => {
  useEffect(() => {
    console.log('BookList render')
    setRowsByParent()
  }, [bookList]);

  const [rows, setRows] = React.useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [openEditBookDialog, setOpenEditBookDialog] = React.useState(false);
  const [openBorrowBookDialog, setOpenBorrowBookDialog] = React.useState(false);

  const setRowsByParent = () => {
    const rows = bookList.map((book => (
      createData(book.codigolibro, book.titulo, book.editorial, book.autor, book.genero, book.paisautor, book.numeropaginas, book.anoedicion, book.precio, book.is_available)
    )));
    setRows(rows)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDialogCallback = () => {
    parentCallback()
    handleClose()
    handleCloseBorrowDialog()
  }

  const handleOpen = () => setOpenEditBookDialog(true);
  const handleClose = () => setOpenEditBookDialog(false);
  const handleOpenBorrowDialog = () => setOpenBorrowBookDialog(true);
  const handleCloseBorrowDialog = () => setOpenBorrowBookDialog(false);

  const handleOpenEditDialog = (book: any) => {
    setSelectedRow(book)
    handleOpen()
  }

  const handleDeleteBook = (book: any) => {
    BooksService.deleteBook(book.codigolibro).then((response: any) => {
      console.log('deleteBook response: ', response)
      parentCallback()
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const handleReturnBook = (book: any) => {
    BorrowsService.returnBook(book.codigolibro).then((response: any) => {
      console.log('returnBook response: ', response)
      parentCallback()
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const handleBorrowBook = (book: any) => {
    setSelectedRow(book)
    handleOpenBorrowDialog()
  }

  return (
    <>
      <EditBookDialog book={selectedRow} openFromParent={openEditBookDialog} parentCallback={handleDialogCallback}/>
      <BorrowBookDialog book={selectedRow} openFromParent={openBorrowBookDialog} parentCallback={handleDialogCallback}/>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key='actions'
                  align='center'
                  style={{minWidth: 100}}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.codigolibro}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'is_available' ? value ? <DoneIcon style={{color: 'green'}}/> :
                              <ClearIcon style={{color: 'red'}}/> : null}
                            {
                              column.format && typeof value === 'number'
                                ? column.format(value)
                                : typeof value !== 'boolean' ? value : null
                            }
                          </TableCell>
                        );
                      })}
                      <TableCell key="Actions" align="center">
                        {row.is_available ?
                          <IconButton onClick={() => handleBorrowBook(row)} aria-label="delete">
                            <BookIcon/>
                          </IconButton> : <IconButton onClick={() => handleReturnBook(row)} aria-label="delete">
                            <AssignmentReturnedIcon/>
                          </IconButton>
                        }
                        <IconButton onClick={() => handleOpenEditDialog(row)} aria-label="delete">
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleDeleteBook(row)} aria-label="delete">
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
