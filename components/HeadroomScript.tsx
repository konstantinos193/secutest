'use client';

import { useEffect } from 'react';

// Define Headroom interface
interface HeadroomOptions {
  offset: number;
  tolerance: {
    up: number;
    down: number;
  };
  classes: {
    initial: string;
    pinned: string;
    unpinned: string;
    top: string;
    notTop: string;
    bottom: string;
    notBottom: string;
  };
}

interface HeadroomClass {
  new (element: HTMLElement, options?: HeadroomOptions): {
    init: () => void;
  };
}

declare global {
  interface Window {
    Headroom: HeadroomClass;
  }
}

const HeadroomScript: React.FC = () => {
  useEffect(() => {
    const initHeadroom = () => {
      const header = document.getElementById('navbar');
      if (!header || !window.Headroom) {
        console.log('Header element or Headroom not found');
        return;
      }

      const headroom = new window.Headroom(header, {
        offset: 0,
        tolerance: {
          up: 0,
          down: 0
        },
        classes: {
          initial: 'headroom',
          pinned: 'headroom--pinned',
          unpinned: 'headroom--unpinned',
          top: 'headroom--top',
          notTop: 'headroom--not-top',
          bottom: 'headroom--bottom',
          notBottom: 'headroom--not-bottom'
        }
      });

      headroom.init();
    };

    // Load Headroom script
    const script = document.createElement('script');
    script.src = '/assets/scripts/headroom.min.js';
    script.async = true;
    script.onload = initHeadroom;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default HeadroomScript; 