import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
