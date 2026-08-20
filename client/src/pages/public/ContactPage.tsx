import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/support/contact', formData);
      if (res.data.success) {
        setSubmitted(true);
        showToast('Your message has been received by Tridrishti Helpdesk!', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Get in Touch</h1>
        <p className="text-base text-slate-300">
          Have questions regarding memberships, reward points, or partner integrations? Our dedicated support team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
            <h3 className="text-xl font-bold text-white">Official Headquarters</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span>TRIDRISHTI Technologies Pvt. Ltd., Express Trade Towers, Sector 132, Noida, Uttar Pradesh 201304, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="font-mono">support@tridrishti.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="font-mono">+91 120 4567 890 (Mon - Sat, 9am - 6pm IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-card border border-dark-border">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-xs text-slate-400">
                  Our operations team has received your message and will respond to{' '}
                  <strong className="text-brand-400 font-mono">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 mt-2 rounded-xl bg-dark-bg border border-dark-border text-xs text-slate-300 hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Inquiry regarding membership or rewards"
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
