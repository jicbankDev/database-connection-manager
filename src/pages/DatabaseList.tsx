import React, { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import { getDatabases, addDatabase } from '../services/databaseService';
import DBTable from '../components/DBTable/DBTable';
import DBDialog from '../components/DBDialog/DBDialog';
import { IDatabase } from '../types/Database.type';
import { useDialog } from '../contexts/DialogContext';
import AddIcon from '@mui/icons-material/Add';

const DatabaseList: React.FC = () => {
  const [databases, setDatabases] = useState<IDatabase[]>([]); // State to store the list of databases
  const { open, selectedDatabase, openDialog, closeDialog } = useDialog(); // Use custom dialog hook

  // Fetch databases when the component mounts
  useEffect(() => {
    fetchDatabases();
  }, []);

  // Function to fetch databases from the service
  const fetchDatabases = async () => {
    const data = await getDatabases();
    setDatabases(data);
  };

  // Handle adding a new database
  const handleAddDatabase = async (newDatabase: any) => {
    await addDatabase(newDatabase);
    fetchDatabases();
  };

  return (
    <Container>
      <h1>Database Connections</h1>
      
      <Button variant="contained" color="primary" onClick={() => openDialog()}>
        <AddIcon />
      </Button>

      {/* Display the list of databases in a table */}
      <DBTable databases={databases} />

      {/* Dialog for adding or editing a database */}
      <DBDialog
        open={open}
        onClose={closeDialog}
        onAdd={handleAddDatabase}
        existingDatabase={selectedDatabase}
      />
    </Container>
  );
};

export default DatabaseList;
