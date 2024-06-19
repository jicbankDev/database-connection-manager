import React, { createContext, useState, ReactNode, useContext } from 'react';
import { IDatabase } from '../types/Database.type';

// Define the interface for the context properties
interface DialogContextProps {
  isDialogOpen: boolean;
  selectedDatabase: IDatabase | undefined;
  openDialog: (database?: IDatabase) => void;
  closeDialog: () => void;
}

// Create a context with a default undefined value
const DialogContext = createContext<DialogContextProps | undefined>(undefined);

// Provider component to manage dialog state and provide it to children components
export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open status
  const [selectedDatabase, setSelectedDatabase] = useState<any | null>(null); // State to manage the selected database

  // Function to open the dialog and set the selected database
  const openDialog = (database?: IDatabase) => {
    setSelectedDatabase(database || null);
    setIsDialogOpen(true);
  };

  // Function to close the dialog and reset the selected database
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedDatabase(null);
  };

  return (
    // Provide the dialog state and functions to the context
    <DialogContext.Provider value={{ isDialogOpen, selectedDatabase, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

// Custom hook to use the dialog context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider'); // Ensure the hook is used within a provider
  }
  return context;
};
