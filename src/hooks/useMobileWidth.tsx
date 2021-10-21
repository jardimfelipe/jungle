import { useEffect, useState } from 'react';

// import { Container } from './styles';

const useMobileWidth = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    width <= 768 ? setIsMobile(true) : setIsMobile(false);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  return isMobile;
};

export default useMobileWidth;
