import React from 'react';
import { useParams } from 'react-router-dom';

const DatabaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Database Details for {id}</h1>

    </div>
  );
};

export default DatabaseDetails;