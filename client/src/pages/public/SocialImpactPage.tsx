import React from 'react';
import { HeartHandshake, BookOpen, HeartPulse, TreePine, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SocialImpactPage: React.FC = () => {
  const projects = [
    {
      title: 'Vidya Jyoti: Rural Children Book & School Kit Drive',
      category: 'Education',
      location: 'Varanasi, UP & Alwar, Rajasthan',
      beneficiaries: '1,850 Children',
      metrics: '3,500 Books Donated',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
      description: 'Equipping underprivileged children in rural schools with textbooks, notebooks, school bags, and stationery kits.',
    },
    {
      title: 'Arogya Sanjeevani: Free Medical & Eye Camps',
      category: 'Healthcare',
      location: 'Tribal Districts of MP & Maharashtra',
      beneficiaries: '8,200 Patients',
      metrics: '42 Medical Camps Completed',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600',
      description: 'Free general health checkups, diabetic screenings, ophthalmology exams, and distributing essential prescription glasses.',
    },
    {
      title: 'Green Earth: Community Tree Plantation Mission',
      category: 'Environment',
      location: 'Delhi-NCR & Bangalore Green Belts',
      beneficiaries: '4,200 Citizens',
      metrics: '5,800 Trees Planted',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
      description: 'Planting native trees in urban degraded areas with volunteer participation and sapling survival tracking.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Community Humanitarian Action</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Tridrishti Social Impact</h1>
        <p className="text-base text-slate-300">
          Transparent, audited, and accountable community impact initiatives supported through our ecosystem trust fund and volunteer network.
        </p>
      </div>

      {/* Aggregate Impact Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 to-dark-card border border-emerald-500/30 text-center">
        <div className="space-y-1">
          <span className="text-3xl font-display font-extrabold text-white">12,450+</span>
          <p className="text-xs text-emerald-400 font-medium">Lives Impacted</p>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-display font-extrabold text-white">3,500</span>
          <p className="text-xs text-emerald-400 font-medium">Books Distributed</p>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-display font-extrabold text-white">42</span>
          <p className="text-xs text-emerald-400 font-medium">Free Medical Camps</p>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-display font-extrabold text-white">1,840</span>
          <p className="text-xs text-emerald-400 font-medium">Active Volunteers</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-dark-card border border-dark-border overflow-hidden flex flex-col justify-between hover:border-slate-500 transition-all"
          >
            <div>
              <div className="h-56 overflow-hidden relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  {p.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
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
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-dark-bg hover:bg-emerald-600 border border-dark-border hover:border-emerald-500 text-center text-xs font-bold text-white transition-all block"
              >
                Volunteer or Sponsor
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
