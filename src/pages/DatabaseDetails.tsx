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
  const { id } = useParams<{ id: string }>();
  const [database, setDatabase] = useState<IDatabase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { open, openDialog, closeDialog } = useDialog();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchDatabase(id);
    } else {
      setError('Invalid database ID.');
      setLoading(false);
    }
  }, [id]);

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
  const handleClickHome = () => {
    navigate('/')
  };
  const handleClickOpenDialog = () => {

    openDialog(database)
  }
  const handleEditDatabase = async (updatedDatabase: any) => {
    await updateDatabase(updatedDatabase);
    setDatabase(updatedDatabase)
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!database) {
    return (
      <Container>
        <Typography>No database details found.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <h1>
        Database Details
      </h1>
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
      <DBDialog open={open}
        onClose={closeDialog}
        onEdit={handleEditDatabase}
        existingDatabase={database} />
    </Container>
  );
};

export default DatabaseDetails;
