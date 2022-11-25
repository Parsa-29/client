import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useUserStore from "../app/userStore";
import { ModalContext } from "../Context/ModalContext";

const AddUser = () => {
  const modalContenxt = useContext(ModalContext);
  const [open, setOpen] = useState(modalContenxt?.openAdd);
  const { users, addUser } = useUserStore(
    (state: { users: any; removeUser: any; addUser: any }) => ({
      users: state.users,
      addUser: state.addUser,
    })
  );

  const handleAddUser = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newUser = {
      id: users.length + 1,
      name: data.get("name"),
      email: data.get("email"),
      gender: data.get("gender"),
      street: data.get("street"),
      city: data.get("city"),
      phone: data.get("phone"),
    };
    addUser(newUser);
    modalContenxt?.setOpenAdd(!modalContenxt?.openAdd);
  };

  return (
    <Modal
      isOpen={modalContenxt?.openAdd}
      toggle={() => {
        modalContenxt?.setOpenAdd(!modalContenxt?.openAdd);
      }}
    >
      <ModalHeader toggle={() => setOpen(!open)}>Add User</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            handleAddUser(e);
          }}
        >
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="User Name" />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="User Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Select Gender</Label>
            <Input type="select" name="gender" id="gender">
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="street">Street</Label>
            <Input
              type="text"
              name="street"
              id="street"
              placeholder="User Street"
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" placeholder="User City" />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Street</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="User Phone"
            />
          </FormGroup>
          <Button>Submit</Button>
          <Button className="btn btn-danger" onClick={() => setOpen(!open)}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddUser;
