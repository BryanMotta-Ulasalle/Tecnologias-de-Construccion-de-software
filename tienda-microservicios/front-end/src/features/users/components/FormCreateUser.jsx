import React, {useState } from "react";
import Form from "../../../shared/components/ui/Form";
import CardCreate from "../../../shared/components/ui/CardCreate";
import {formUsersName, formUsersEmail, formUsersRole, formUsersStatus} from "../data/data"
import Button from "../../../shared/components/ui/Button";
import LabelInput from "../../../shared/components/ui/LabelInput";
import { X } from 'lucide-react';
import LabelSelect from "../../../shared/components/ui/LabelSelect";
import { useTranslation } from "react-i18next";
import validateName from "../../../validators/name.validator";
import { validateEmail } from "../../../validators/email.validator";

const FormCreateUser = ({ onClose, onCreateUser,  handleClose}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState({});

  const {t} = useTranslation('users', 'common');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const nameError = validateName(name);

    setError({ name: nameError });

    if (nameError) {
      return;
    }

    const emailError = validateEmail(email);

    setError({ email: emailError });

    if (emailError) {
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
      <div className="flex items-center justify-between border-b border-tableBorder p-5">
        <h1 className="text-text2 text-2xl">{t('users:title')}</h1>
        <Button onClick={handleClose} variant="none">
          <X className="w-6 h-6 text-text2 "/>
        </Button>
      </div>
      <Form action={handleSubmit}>
        <div className="px-5 py-4 flex flex-col">
          
          <LabelInput
          label={t('users:form.name.label')}
          id={formUsersName.name}
          type={formUsersName.type}
          placeholder={t('users:form.name.placeholder')}
          value={name}
          onChange={(e) => {setName(e.target.value); console.log(e.target.value)}}
        />
        {error.name && <p className="text-red-500 text-sm mb-2">{error.name}</p>}
        
        <LabelInput
          label={t('users:form.email.label')}
          id={formUsersEmail.name}
          type={formUsersEmail.type}
          placeholder={t('users:form.email.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p className="text-red-500 text-sm mb-2">{error.email}</p>}
        <div className="flex flex-row gap-8">
          <div className="flex-1">
            <LabelSelect selectOptions={formUsersRole} htmlFor="Rol" children={t('users:form.role.label')} />
          </div>
          <div className="flex-1">
            <LabelSelect selectOptions={formUsersStatus} htmlFor="Estado" children={t('users:form.status.label')} />
          </div>
        </div>
        </div>
        <div className="flex flex-row justify-end py-4 px-5 border-t border-tableBorder">
          <Button type="button" onClick={handleClose} className="" variant="cancel">{t('common:actions.cancel')}</Button>
          <Button type="submit">{t('users:addUser')}</Button>
        </div>
      </Form>
    </CardCreate>
  );
};

export default FormCreateUser;
