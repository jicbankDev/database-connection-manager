import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IDatabase } from '../../types/Database.type';
import { useEffect, useState } from 'react';

type Props = {
  isDialogOpen: boolean;
  onClose: () => void;
  onAdd?: (database: IDatabase) => void;
  onEdit?: (database: IDatabase) => void;
  existingDatabase?: IDatabase;
}

const DBDialog = (props: Props) => {
  let { isDialogOpen, onClose, onAdd, onEdit, existingDatabase } = props;
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [database, setDatabase] = useState({ // Initial state for database form fields
    id: '',
    name: '',
    url: '',
    username: '',
    password: '',
    type: ''
  });

  // Update state if existingDatabase is provided
  useEffect(() => {
    if (existingDatabase) {
      setDatabase(existingDatabase);
    }
  }, [existingDatabase]);

  const handleCloseDialog = () => {
    setDatabase({ // Reset the form after adding
      id: '',
      name: '',
      url: '',
      username: '',
      password: '',
      type: ''
    });
    onClose()
  }
  // Handle save action for adding or editing a database
  const handleSaveDatabase = () => {
    if (validateForm()) {
    if (existingDatabase && onEdit) {
      onEdit(database);
      setDatabase(database);
    } else if (onAdd) {
      const newDatabase = {
        ...database,
        id: generateId() // Generate a unique ID for the new database
      };
      onAdd(newDatabase);
      setDatabase({ // Reset the form after adding
        id: '',
        name: '',
        url: '',
        username: '',
        password: '',
        type: ''
      });
    }
    onClose();
  }
  };

  // Handle input changes for the form fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDatabase(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'name' || name === 'password') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: value.trim() === '' ? `${name} is required` : ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (database.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    } else {
      newErrors.name = '';
    }

    if (database.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  };
  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Generate a unique ID for a new database
  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>{existingDatabase ? 'Edit' : 'Add New'} Database</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Database Name"
          type="text"
          fullWidth
          error={!!errors.name}
          value={database.name}
          onChange={handleChange}
          required
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={database.password}
          onChange={handleChange}
          error={!!errors.name}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveDatabase} color="primary">
          {existingDatabase ? 'Save Changes' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DBDialog;
