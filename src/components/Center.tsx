import React from 'react';

const Center = (props: { children: React.ReactNode; className: string }) => {
  return (
    <div className={`${props.className} mx-auto p-4 md:max-w-3xl md:p-8`}>
      {props.children}
    </div>
  );
};

export default Center;
