import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Users, TreePine, BookOpen, HeartPulse } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const SocialImpactPage: React.FC = () => {
  const { showToast } = useToast();
  const [joinedProjects, setJoinedProjects] = useState<Record<string, boolean>>({});

  const projects = [
    {
      id: 'vidya_jyoti',
      title: 'Vidya Jyoti: Rural School Kit & Book Drive',
      location: 'Varanasi, UP & Alwar, Rajasthan',
      beneficiaries: '1,850 Children',
      metrics: '3,500 Books Donated',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
      description: 'Equipping underprivileged students across government rural schools with complete educational packs.',
    },
    {
      id: 'arogya_camps',
      title: 'Arogya Sanjeevani: Free Medical Screening Camps',
      location: 'Tribal Districts of MP & Maharashtra',
      beneficiaries: '8,200 Patients',
      metrics: '42 Medical Camps Completed',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600',
      description: 'Providing diagnostic tests, consultations, and distributing free prescription glasses.',
    },
  ];

  const handleJoinVolunteer = (id: string) => {
    setJoinedProjects((prev) => ({ ...prev, [id]: true }));
    showToast('Enrolled as volunteer for this community initiative! Check email for team coordination.', 'success');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Social Impact & Humanitarian Initiatives</h2>
        <p className="text-xs text-slate-400">
          Participate in transparent community projects, volunteer locally, and track live social impact milestones
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => {
          const isJoined = joinedProjects[p.id];
          return (
            <div
              key={p.id}
              className="rounded-3xl bg-dark-card border border-dark-border overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-dark-border text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Location</span>
                      <span className="font-semibold text-slate-200">{p.location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Milestone</span>
                      <span className="font-semibold text-emerald-400">{p.metrics}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleJoinVolunteer(p.id)}
                  disabled={isJoined}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isJoined
                      ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isJoined ? 'Enrolled as Volunteer' : 'Join as Volunteer'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
