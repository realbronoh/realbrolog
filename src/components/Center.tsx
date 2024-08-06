import React from 'react';

const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto p-4 min-h-screen md:max-w-3xl md:p-8">
      {children}
    </div>
  );
};

export default Center;
