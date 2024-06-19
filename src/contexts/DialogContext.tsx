import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the interface for the context properties
interface DialogContextProps {
  open: boolean;
  selectedDatabase: any | null;
  openDialog: (database?: any) => void;
  closeDialog: () => void;
}

// Create a context with a default undefined value
const DialogContext = createContext<DialogContextProps | undefined>(undefined);

// Provider component to manage dialog state and provide it to children components
export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false); // State to manage dialog open status
  const [selectedDatabase, setSelectedDatabase] = useState<any | null>(null); // State to manage the selected database

  // Function to open the dialog and set the selected database
  const openDialog = (database?: any) => {
    setSelectedDatabase(database || null);
    setOpen(true);
  };

  // Function to close the dialog and reset the selected database
  const closeDialog = () => {
    setOpen(false);
    setSelectedDatabase(null);
  };

  return (
    // Provide the dialog state and functions to the context
    <DialogContext.Provider value={{ open, selectedDatabase, openDialog, closeDialog }}>
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
