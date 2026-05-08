import React from 'react'

export const validateStock = (stock) => {
  if (stock < 0) {
    return "El stock debe ser un número no negativo.";
  }
  return null;
}
