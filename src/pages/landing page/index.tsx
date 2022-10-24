import React, { useEffect, useState } from "react";

function Header() {
  return (
    <>
      <div className="fixed top-0 w-full h-20 bg-black">
        <div className=" flex flex-col">
          <div className="logo px-2"></div>
          <div className="menu px-3"></div>
          <div className="login px-2"></div>
        </div>
      </div>
    </>
  );
}

const LandingPage = () => {
  return (
    <>
      <div className="flex">
        <Header />
      </div>
    </>
  );
};
export default LandingPage;
