import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './components/page/Home';
import { About } from './components/page/About';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Aboutページの時だけbodyにabout-pageクラスを追加
    if (location.pathname === '/about') {
      document.body.classList.add('about-page');
    } else {
      document.body.classList.remove('about-page');
    }

    // クリーンアップ
    return () => {
      document.body.classList.remove('about-page');
    };
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

