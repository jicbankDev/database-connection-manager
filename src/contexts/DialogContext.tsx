import React, { createContext, useState, ReactNode, useContext } from 'react';

interface DialogContextProps {
  open: boolean;
  selectedDatabase: any | null;
  openDialog: (database?: any) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<any | null>(null);

  const openDialog = (database?: any) => {
    setSelectedDatabase(database || null);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedDatabase(null);
  };

  return (
    <DialogContext.Provider value={{ open, selectedDatabase, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
