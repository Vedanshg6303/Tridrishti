import React, { useState } from 'react';
import { HeartPulse, ShieldCheck, Video, Calendar, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const HealthcarePage: React.FC = () => {
  const { showToast } = useToast();
  const [bookingPass, setBookingPass] = useState(false);

  const handleBookTelehealth = () => {
    setBookingPass(true);
    setTimeout(() => {
      setBookingPass(false);
      showToast('Telehealth consult session pass generated! Check SMS/WhatsApp for physician meeting link.', 'success');
    }, 1000);
  };

  const handleBookCheckup = () => {
    showToast('Preventative Diagnostics voucher generated! Our NABL partner will contact you for home sample collection.', 'success');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Healthcare Assistance</h2>
        <p className="text-xs text-slate-400">
          Partnered telehealth consultations, free annual diagnostics, and community medical camp schedules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telehealth Card */}
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">24x7 Doctor Tele-Consultation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlimited access to certified General Physicians and specialist doctors over encrypted video call.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero wait-time express queue</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Digital prescription delivered via WhatsApp</span>
              </li>
            </ul>
          </div>
          <button
            onClick={handleBookTelehealth}
            disabled={bookingPass}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{bookingPass ? 'Connecting with Doctor...' : 'Book Instant Telehealth Pass'}</span>
          </button>
        </div>

        {/* Diagnostics Voucher Card */}
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Annual Full-Body Diagnostics Pass</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complimentary home phlebotomy sample collection covering 60+ parameters with report in 24 hours.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NABL & CAP certified laboratory testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Includes CBC, Lipid, Liver & Kidney profiles</span>
              </li>
            </ul>
          </div>
          <button
            onClick={handleBookCheckup}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Home Diagnostic Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
