import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { getDatabases } from '../services/databaseService';
import DBTable from '../components/DBTable/DBTable';

const DatabaseList: React.FC = () => {
  const [databases, setDatabases] = useState<any[]>([]);


  useEffect(() => {
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    const data = await getDatabases();
    setDatabases(data);
  };


  return (
    <Container>
      <h1>Database Connections</h1>

      <DBTable databases={databases}/>
    </Container>
  );
};

export default DatabaseList;
