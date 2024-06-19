import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { IDatabase } from '../../types/Database.type';
import { useEffect, useState } from 'react';


type Props = {
  open: boolean;
  onClose: () => void;
  onAdd?: (database: IDatabase) => void;
  onEdit?: (database: IDatabase) => void;
  existingDatabase?: IDatabase;
}
const DBDialog = (props: Props) => {

  let { open, onClose, onAdd, onEdit, existingDatabase } = props;
  const [database, setDatabase] = useState({
    id: '',
    name: '',
    url: '',
    username: '',
    password: '',
    type: ''
  });

  useEffect(() => {
    if (existingDatabase) {
      setDatabase(existingDatabase);
    }
  }, [existingDatabase]);

  const handleSaveDatabase = () => {
    if (existingDatabase && onEdit) {
      onEdit(database);
      setDatabase(database);
    } else if (onAdd) {
      onAdd(database);
      setDatabase({
        id: '',
        name: '',
        url: '',
        username: '',
        password: '',
        type: ''
      });
    }
    onClose();
  };

  const handleChange = (e: any) => {
    setDatabase({
      ...database,
      [e.target.name!]: e.target.value
    });
  };



  return <>
    <Dialog open={open} >
      <DialogTitle>{existingDatabase ? 'Edit' : 'Add New' } Database</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Database Name"
          type="text"
          fullWidth
          value={database.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="url"
          label="Database URL"
          type="text"
          fullWidth
          value={database.url}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={database.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={database.password}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={database.type}
            onChange={handleChange}
          >
            <MenuItem value="Snowflake">Snowflake</MenuItem>
            <MenuItem value="Trino">Trino</MenuItem>
            <MenuItem value="MySQL">MySQL</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveDatabase} color="primary">
          {existingDatabase ? 'Save Changes' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  </>
}
export default DBDialog