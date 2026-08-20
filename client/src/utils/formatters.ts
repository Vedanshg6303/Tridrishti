export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat('en-IN').format(points);
};

export const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString?: string | Date): string => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getLevelColor = (level: number): { bg: string; text: string; border: string; glow: string } => {
  switch (level) {
    case 5:
      return {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      };
    case 4:
      return {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
      };
    case 3:
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      };
    case 2:
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      };
    default:
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      };
  }
};
