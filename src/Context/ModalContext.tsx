import React, { createContext } from "react";

export type IModalContext = {
  openAdd: boolean;
  setOpenAdd: (openAdd: boolean) => void;
  openEdit: boolean;
  setOpenEdit: (openEdit: boolean) => void;
};

interface Props {
  children: React.ReactNode;
  value: IModalContext;
}

export const ModalContext = createContext<IModalContext>({
  openAdd: false,
  openEdit: false,
  setOpenAdd: () => {},
  setOpenEdit: () => {},
});

const ModalContextProvider = ({ children, value }: Props) => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
