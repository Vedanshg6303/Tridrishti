import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GuidedTour } from '../common/GuidedTour';
import { DrishtiAIBot } from '../common/DrishtiAIBot';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <GuidedTour />
      <DrishtiAIBot />
    </div>
  );
};
