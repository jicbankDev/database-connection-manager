import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, updateDatabase } from '../services/databaseService';
import { IDatabase } from '../types/Database.type';
import { Container, Typography, CircularProgress, Button, ButtonGroup } from '@mui/material';
import DBDialog from '../components/DBDialog/DBDialog';
import { useDialog } from '../contexts/DialogContext';

import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

const DatabaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get database ID from URL parameters
  const [database, setDatabase] = useState<IDatabase | null>(null); // State to store database details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  const { open, openDialog, closeDialog } = useDialog(); // Use custom dialog hook

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch database details when the component mounts or when the ID changes
  useEffect(() => {
    if (id) {
      fetchDatabase(id);
    } else {
      setError('Invalid database ID.');
      setLoading(false);
    }
  }, [id]);

  // Function to fetch database details from the service
  const fetchDatabase = async (id: string) => {
    try {
      const data = await getDatabase(id);
      setDatabase(data);
    } catch (error) {
      setError('Failed to fetch database details.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to home page
  const handleClickHome = () => {
    navigate('/');
  };

  // Open the dialog with the current database details
  const handleClickOpenDialog = () => {
    openDialog(database);
  };

  // Handle database edit
  const handleEditDatabase = async (updatedDatabase: any) => {
    await updateDatabase(updatedDatabase);
    setDatabase(updatedDatabase);
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  // Show error message if there is an error
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  // Show message if no database details are found
  if (!database) {
    return (
      <Container>
        <Typography>No database details found.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Database Details</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenDialog}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickHome}
        >
          <HomeIcon />
        </Button>
      </ButtonGroup>
      <Typography variant="h6" className="detail">
        Database Name: {database.name}
      </Typography>
      <Typography variant="h6" className="detail">
        URL: {database.url}
      </Typography>
      <Typography variant="h6" className="detail">
        Username: {database.username}
      </Typography>
      <Typography variant="h6" className="detail">
        Database Type: {database.type}
      </Typography>
      <DBDialog
        open={open}
        onClose={closeDialog}
        onEdit={handleEditDatabase}
        existingDatabase={database}
      />
    </Container>
  );
};

export default DatabaseDetails;
