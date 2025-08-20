import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Books from '../Books';
import BooksMobView from '../mobile/BooksMobView';

const AllBooks = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Desktop View */}
      {!isMobile && <Books />}

      {/* Mobile View */}
      {isMobile && <BooksMobView />}
    </div>
  );
};

export default AllBooks;
