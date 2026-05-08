import React from 'react'

export const validatePrice = (price) => {
  if (price <= 0) {
    return "El precio debe ser un número positivo.";
  }
  return null;
}
