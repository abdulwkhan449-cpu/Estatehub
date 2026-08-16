import React from 'react';
import { Star, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { Agent } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface AgentCardProps {
  agent: Agent;
  onSelectAgent: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelectAgent }) => {
  return (
    <div
      onClick={() => onSelectAgent(agent)}
      className="group relative bg-white dark:bg-[#16181D] rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between space-y-5"
    >
      <div className="space-y-4">
        {/* Photo and Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#D4AF37] text-slate-950 shadow" title="Certified Agent">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
              {agent.name}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{agent.title}</p>
            <p className="text-xs font-semibold text-[#D4AF37]">{agent.agency}</p>
          </div>
        </div>

        {/* Rating and Experience Badges */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <strong className="text-slate-900 dark:text-white font-bold">
              <AnimatedCounter value={agent.rating} />
            </strong>
            <span className="text-slate-400">
              (<AnimatedCounter value={agent.reviewCount} />)
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span><AnimatedCounter value={agent.experience} /></span>
          </div>
        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {agent.bio}
        </p>

        {/* Specialties Chips */}
        <div className="flex flex-wrap gap-1.5">
          {agent.specialties.map((s, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] font-semibold"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
        <span className="font-semibold text-[#D4AF37] group-hover:underline">
          View Profile & Listed Properties
        </span>
      </div>
    </div>
  );
};
