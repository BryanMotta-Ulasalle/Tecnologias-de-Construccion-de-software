import React from 'react'

export const validateOption = (option) => {
  if (!option) {
    return "Debe seleccionar una opción.";
  }
  return null;
}
