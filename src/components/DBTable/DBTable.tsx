import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup, TablePagination, TableContainer } from '@mui/material';
import { IDatabase } from '../../types/Database.type';
import { useNavigate } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import "./DBTable.style.css";
import { useDialog } from '../../contexts/DialogContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { deleteDatabase } from '../../services/databaseService';


type Props = {
  databases: IDatabase[];
  fetchDatabases: () => void
};

const DBTable = (props: Props) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { openSnackbar } = useSnackbar();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { databases, fetchDatabases } = props;

  const { openDialog } = useDialog();

  const handleEditClick = (db: IDatabase) => {
    openDialog(db);
  };
  const handledeleteClick = (id: string) => {
    deleteDatabase(id)
    fetchDatabases();
    openSnackbar('Database deleted successfully.'); 
  };

  const paginatedDatabases = databases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
    <TableContainer>
      <Table className="table-custom">
        <TableHead className="table-header">
          <TableRow>
            <TableCell className="table-cell">Database Name</TableCell>
            <TableCell className="table-cell">Username</TableCell>
            <TableCell className="table-cell">Database Type</TableCell>
            <TableCell className="table-cell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedDatabases.map((db) => (
            <TableRow
              key={db.id}
              className="clickable-row">
              <TableCell className="clickable-tablecell" onClick={() => navigate(`/database/${db.id}`)}>{db.name}</TableCell>
              <TableCell className="clickable-tablecell" onClick={() => navigate(`/database/${db.id}`)}>{db.username}</TableCell>
              <TableCell className="clickable-tablecell" onClick={() => navigate(`/database/${db.id}`)}>{db.type}</TableCell>
              <TableCell >
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(db)}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handledeleteClick(db.id)}
                >
                  <DeleteIcon />
                </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100,{ value: -1, label: 'All' }]}
        component="div"
        count={databases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DBTable;
