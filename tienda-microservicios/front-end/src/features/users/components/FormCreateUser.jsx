import React, { useState } from "react";
import Form from "../../../shared/components/ui/Form";
import CardCreate from "../../../shared/components/ui/CardCreate";

const FormCreateUser = ({ onClose, onCreateUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      await onCreateUser({ nombre: name.trim(), email: email.trim() });

      setName("");
      setEmail("");
      onClose();
    } catch (error) {
      alert("Error creating user");
      console.error(error);
    }
  };

  return (
    <CardCreate>
      <Form>
        
      </Form>
    </CardCreate>
  );
};

export default FormCreateUser;
