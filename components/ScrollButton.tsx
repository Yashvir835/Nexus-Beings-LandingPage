'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowDown } from 'react-icons/fa';

const pageOrder = ['/landingPage', '/landingPage/overview', '/landingPage/our-mission', '/landingPage/product', '/landingPage/footer'];

export default function ScrollDownArrow() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = pageOrder.indexOf(pathname);
  const nextPage = currentIndex < pageOrder.length - 1
    ? pageOrder[currentIndex + 1]
    : null;

  if (!nextPage || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 bg-black transform -translate-x-1/2 animate-bounce">
      <Link href={nextPage} scroll={false}>
        <FaArrowDown className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer" />
      </Link>
    </div>
  );
}