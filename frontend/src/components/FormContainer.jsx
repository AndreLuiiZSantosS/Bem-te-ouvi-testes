import React from 'react';

export const FormContainer = ({ children }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-16 px-4">
      {children}
    </div>
  );
};