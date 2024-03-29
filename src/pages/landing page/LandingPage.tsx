import React, { useEffect, useRef } from 'react';

import Header from './Header';
// import Home from './Home';
import Home from './Home';
import Product from './Products';

import Footer from './Footer';
const Introduction = React.lazy(() => import('./Introduction'));

const LandingPage = () => {
  const homeRef = useRef();
  const productRef = useRef();
  const introRef = useRef();
  const contactRef = useRef();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
  useEffect(() => {
    const hiddenElements = document.querySelectorAll('.hide');
    hiddenElements.forEach((el) => observer.observe(el));
    console.count();
  }, [observer]);
  return (
    <>
      <div className=" font-customFont flex bg-dark-blue h-screen flex-col overflow-x-hidden	">
        <Header references={[homeRef, productRef, introRef, contactRef]} />
        <Home ref={homeRef} />
        <Product ref={productRef} />

        <React.Suspense fallback={<></>}>
          <Introduction ref={introRef} />
        </React.Suspense>
        <Footer ref={contactRef} />
      </div>
    </>
  );
};
export default LandingPage;
