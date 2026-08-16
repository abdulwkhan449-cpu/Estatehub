import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { AgentProfileModal } from './components/AgentProfileModal';
import { PropertyComparisonModal } from './components/PropertyComparisonModal';
import { AiPropertyAdvisor } from './components/AiPropertyAdvisor';

import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AgentsPage } from './pages/AgentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { Property, Agent, FilterState } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);

  // Global Catalog Filter State
  const [catalogFilters, setCatalogFilters] = useState<FilterState>({
    status: 'all',
    type: 'all',
    city: 'all',
    maxPrice: 500000000,
    minBedrooms: 'any',
    searchQuery: '',
    sortBy: 'featured',
  });

  const resetFilters = () => {
    setCatalogFilters({
      status: 'all',
      type: 'all',
      city: 'all',
      maxPrice: 500000000,
      minBedrooms: 'any',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0B0D] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-[#D4AF37] selection:text-slate-950">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSelectProperty={p => setSelectedProperty(p)}
            onSelectAgent={a => setSelectedAgent(a)}
            onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
            setActiveTab={setActiveTab}
            setCatalogFilters={setCatalogFilters}
          />
        )}

        {activeTab === 'listings' && (
          <ListingsPage
            filters={catalogFilters}
            setFilters={setCatalogFilters}
            resetFilters={resetFilters}
            onSelectProperty={p => setSelectedProperty(p)}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage
            onSelectProperty={p => setSelectedProperty(p)}
            onOpenComparisonModal={() => setIsComparisonOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'agents' && (
          <AgentsPage onSelectAgent={a => setSelectedAgent(a)} />
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modal Dialogs */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenAgentProfile={a => setSelectedAgent(a)}
      />

      <AgentProfileModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onSelectProperty={p => setSelectedProperty(p)}
      />

      <PropertyComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onSelectProperty={p => setSelectedProperty(p)}
      />

      <AiPropertyAdvisor
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        onSelectProperty={p => setSelectedProperty(p)}
      />

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}

export default App;
