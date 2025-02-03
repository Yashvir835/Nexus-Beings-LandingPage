'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';

// Sequence of pages for the transition
const pages = [
  '/landingPage',
  '/landingPage/overView',
  '/landingPage/Mission',
  '/landingPage/Pricing',
  '/landingPage/product'
];

const SWIPE_THRESHOLD = 60; // Minimum scroll/touch distance to trigger a transition

export default function PageTransitionLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Next.js router for navigation
  const pathname = usePathname(); // Get the current route pathname
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the page container (used for animations)
  const [touchStart, setTouchStart] = useState<number>(0); // Stores the starting Y position of a touch event
  const isAnimatingRef = useRef(false); // Flag to prevent multiple animations at once

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return; // Prevent navigation if an animation is already in progress

    const currentIndex = pages.indexOf(pathname || '');
    if (currentIndex === -1) return;

    let targetPage = '';
    if (direction === 'next' && currentIndex < pages.length - 1) {
      targetPage = pages[currentIndex + 1];
    } else if (direction === 'prev' && currentIndex > 0) {
      targetPage = pages[currentIndex - 1];
    }
    if (!targetPage) return;

    isAnimatingRef.current = true;
    gsap.to(containerRef.current, {
      opacity: 0,
      y: direction === 'next' ? -30 : 30,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(targetPage);
      },
    });
  };

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < SWIPE_THRESHOLD || !containerRef.current) return;

    const container = containerRef.current;
    const isAtTop = container.scrollTop === 0;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

    if (e.deltaY > 0) {
      if (!isAtBottom) return;
      navigate('next');
    } else {
      if (!isAtTop) return;
      navigate('prev');
    }
  };

  const handleTouchStart = (e: TouchEvent) => setTouchStart(e.touches[0].clientY);

  const handleTouchEnd = (e: TouchEvent) => {
    const delta = touchStart - e.changedTouches[0].clientY;
    if (Math.abs(delta) < SWIPE_THRESHOLD || !containerRef.current) return;

    const container = containerRef.current;
    const isAtTop = container.scrollTop === 0;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

    if (delta > 0) {
      if (!isAtBottom) return;
      navigate('next');
    } else {
      if (!isAtTop) return;
      navigate('prev');
    }
  };

  // Optionally prevent default touchmove behavior to further avoid pull-to-refresh
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current) {
        const isAtTop = containerRef.current.scrollTop === 0;
        if (isAtTop) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchStart, pathname]);

  useEffect(() => {
    isAnimatingRef.current = false;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.inOut' }
    );
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      style={{ overscrollBehaviorY: 'none' }} // Prevent native pull-to-refresh on mobile
      className="fixed inset-0 overflow-y-auto"
    >
      {children}
    </div>
  );
}
