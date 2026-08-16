import React, { useState } from 'react';
import { X, Star, Phone, Mail, Award, CheckCircle2, Send, Building2 } from 'lucide-react';
import { Agent, Property } from '../types';
import { MOCK_PROPERTIES } from '../data/mockData';
import { PropertyCard } from './PropertyCard';
import { useToast } from '../context/ToastContext';

interface AgentProfileModalProps {
  agent: Agent | null;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AgentProfileModal: React.FC<AgentProfileModalProps> = ({
  agent,
  onClose,
  onSelectProperty,
}) => {
  if (!agent) return null;

  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hi ${agent.name}, I would like to inquire about real estate options.`);
  const [isSending, setIsSending] = useState(false);

  const agentProperties = MOCK_PROPERTIES.filter(p => p.agent.id === agent.id);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast('success', 'Message Sent!', `Your direct inquiry has been sent to ${agent.name}.`);
      setName('');
      setEmail('');
      setPhone('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Agent Profile</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Top Profile Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-xl shrink-0"
            />
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold tracking-tight">{agent.name}</h2>
                  <span title="Verified Agent">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </span>
                </div>
                <p className="text-sm text-blue-200">{agent.title} • {agent.agency}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <strong className="text-white font-bold text-sm">{agent.rating}</strong>
                  <span className="text-slate-300">({agent.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-blue-300 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{agent.experience} Experience</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                {agent.bio}
              </p>
            </div>
          </div>

          {/* Contact & Inquiry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Direct Contact Info</h3>
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-500" />
                <span>{agent.phone}</span>
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{agent.email}</span>
              </a>

              <div className="pt-2">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1.5">
                  {agent.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <form
              onSubmit={handleContactSubmit}
              className="md:col-span-7 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Schedule Tour or Send Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Sending...' : `Send Inquiry to ${agent.name}`}</span>
              </button>
            </form>
          </div>

          {/* Agent's Active Listings */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Properties Represented by {agent.name} ({agentProperties.length})
            </h3>
            {agentProperties.length === 0 ? (
              <p className="text-xs text-slate-500">No active public listings currently.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentProperties.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    onSelectProperty={prop => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
