import React, { useState } from 'react';
import { Users, Search, Award, Star, Phone, Mail } from 'lucide-react';
import { Agent } from '../types';
import { SAMPLE_AGENTS } from '../data/mockData';
import { AgentCard } from '../components/AgentCard';

interface AgentsPageProps {
  onSelectAgent: (agent: Agent) => void;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ onSelectAgent }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = SAMPLE_AGENTS.filter(agent => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.title.toLowerCase().includes(q) ||
      agent.specialties.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Certified Professionals
          </span>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Real Estate Agent Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Connect with certified agents specializing in luxury villas, modern apartments, and commercial investments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search agents by name or specialty..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} onSelectAgent={onSelectAgent} />
        ))}
      </div>
    </div>
  );
};
