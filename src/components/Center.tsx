import React from 'react';

const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto p-4 md:max-w-3xl md:p-8 flex items-center justify-center md:justify-start">
      {props.children}
    </div>
  );
};

export default Center;
