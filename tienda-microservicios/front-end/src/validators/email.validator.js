import React from 'react'

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "El correo electrónico es requerido.";
  }

  if (!emailRegex.test(email)) {
    return "El correo electrónico no es válido.";
  }

  return null;
}
