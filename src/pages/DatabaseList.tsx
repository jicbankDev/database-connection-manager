import React, { useEffect, useState } from 'react';
import { Container, Button, Snackbar } from '@mui/material';
import { getDatabases, addDatabase, updateDatabase } from '../services/databaseService';
import DBTable from '../components/DBTable/DBTable';
import DBDialog from '../components/DBDialog/DBDialog';
import { IDatabase } from '../types/Database.type';
import { useDialog } from '../contexts/DialogContext';
import { useSnackbar } from '../contexts/SnackbarContext';
import AddIcon from '@mui/icons-material/Add';

const DatabaseList: React.FC = () => {
  const [databases, setDatabases] = useState<IDatabase[]>([]); // State to store the list of databases
  const { isDialogOpen, selectedDatabase, openDialog, closeDialog } = useDialog(); // Use custom dialog hook
  const { snackbarMessage, isSnackbarOpen, openSnackbar, closeSnackbar  } = useSnackbar();

  // Fetch databases when the component mounts
  useEffect(() => {
    fetchDatabases();
  }, []);

  // Function to fetch databases from the service
  const fetchDatabases = async () => {
    try {
      const data = await getDatabases();
      setDatabases(data);
    } catch (error) {
      openSnackbar('Failed to fetch databases.'); 
    }
  };

  // Handle adding a new database
  const handleAddDatabase = async (newDatabase: any) => {
    try {
      await addDatabase(newDatabase);
      fetchDatabases();
      openSnackbar('Database saved successfully.'); 
    } catch (error: any) {
      openSnackbar(error.message); 
    }
  };

  const handleEditDatabase = async (newDatabase: any) => {
    try {
      await updateDatabase(newDatabase);
      fetchDatabases();
      openSnackbar('Database updated successfully.'); 
    } catch (error: any) {
      openSnackbar(error.message); 
    }
  };
  return (
    <Container>
      <h1>Database Connections</h1>
      
      <Button variant="contained" color="primary" onClick={() => openDialog()}>
        <AddIcon />
      </Button>

      {/* Display the list of databases in a table */}
      <DBTable databases={databases} fetchDatabases={fetchDatabases}/>

      {/* Dialog for adding or editing a database */}
      <DBDialog
        isDialogOpen={isDialogOpen}
        onClose={closeDialog}
        onAdd={handleAddDatabase}
        onEdit={handleEditDatabase}
        existingDatabase={selectedDatabase}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={closeSnackbar}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default DatabaseList;
