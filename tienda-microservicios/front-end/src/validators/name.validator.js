import React from 'react'

const validateName = (name) => {

    const nameRegex = /^[a-zA-Z\s]+$/;

    if(!name.trim()) {
        return "El nombre es requerido.";
    }

    if (!nameRegex.test(name)) {
        return "El nombre solo puede contener letras y espacios.";
    }
    return null;
}

export default validateName