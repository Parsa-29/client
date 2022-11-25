import React, { useEffect, useState, useContext } from "react";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DataTable from "react-data-table-component";
import useUserStore from "./app/userStore";
import { Button } from "reactstrap";
import ModalContenxtProvider from "./Context/ModalContext";
import "./App.css";
import Chart from "./components/Chart";


interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  street: string;
  city: string;
  phone: string;
  address: any;
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editUserdata, setEditUserdata] = useState();

  const { users, removeUser, addUser } = useUserStore(
    (state: { users: any; removeUser: any; addUser: any }) => ({
      users: state.users,
      removeUser: state.removeUser,
      addUser: state.addUser,
    })
  );

  const columns = [
    {
      name: "#",
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: User) => row.gender,
      sortable: true,
    },
    {
      name: "Street",
      selector: (row: User) => row.street,
      sortable: true,
    },
    {
      name: "City",
      selector: (row: User) => row.city,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: User) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: User) => (
        <Button className="btn btn-danger" onClick={() => removeUser(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const userFetch = () => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((user: User) => {
          addUser({
            id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            street: user.address.street,
            city: user.address.city,
            phone: user.phone,
          });
        });
      });
  };

  const editUserData = (row: any) => {
    setEditUserdata(row);
    setEdit(true);
  };

  useEffect(() => {
    window.addEventListener("load", userFetch);
  }, []);

  const citys = users.map((user: User) => user.city);
  const citysCount = citys.reduce((acc: any, city: any) => {
    if (typeof acc[city] == "undefined") {
      acc[city] = 1;
    } else {
      acc[city] += 1;
    }
    return acc;
  }, {});

  const series = Object.keys(citysCount).map((key) => citysCount[key]);
  const options = {
    labels: Object.keys(citysCount),
  };

  return (
    <ModalContenxtProvider
      value={{
        openAdd: open,
        setOpenAdd: setOpen,
        openEdit: edit,
        setOpenEdit: setEdit,
      }}
    >
      <div className="App">
        <div className="container">
          {open && <AddUser />}
          {edit && <EditUser userData={editUserdata} />}
          <header
            className="App-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Users</h1>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              color="btn btn-primary"
            >
              Add
            </Button>
          </header>
          <DataTable
            columns={columns}
            data={users}
            pagination
            defaultSortFieldId={1}
            onRowDoubleClicked={(row: User) => {
              editUserData(row);
            }}
          />
          <Chart data={series} options={options} />
        </div>
      </div>
    </ModalContenxtProvider>
  );
};

export default App;
