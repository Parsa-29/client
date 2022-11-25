import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useUserStore from "../app/userStore";
import { ModalContext } from "../Context/ModalContext";

interface Props {
  userData: any;
}

const EditUser = ({ userData }: Props) => {
  const modalContenxt = useContext(ModalContext);
  const [open, setOpen] = useState(modalContenxt?.openEdit);

  const { editUser } = useUserStore((state: { editUser: any }) => ({
    editUser: state.editUser,
  }));

  const handleEditUser = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newUser = {
      id: userData.id,
      name: data.get("name"),
      email: data.get("email"),
      gender: data.get("gender"),
      street: data.get("street"),
      city: data.get("city"),
      phone: data.get("phone"),
    };
    editUser(newUser);
    modalContenxt?.setOpenEdit(!modalContenxt?.openEdit);
  };

  return (
    <Modal
      isOpen={modalContenxt?.openEdit}
      toggle={() => {
        modalContenxt?.setOpenEdit(!modalContenxt?.openEdit);
      }}
    >
      <ModalHeader toggle={() => setOpen(!open)}>Edit User</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            handleEditUser(e);
          }}
        >
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="User Name"
              defaultValue={userData.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="User Email"
              defaultValue={userData.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Select Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              defaultValue={userData.gender}
            >
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
              defaultValue={userData.street}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="User City"
              defaultValue={userData.city}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="User Phone"
              defaultValue={userData.phone}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditUser;
