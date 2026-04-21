export const processDeadlines = (deadlines) => {
  if (!deadlines || deadlines.length === 0) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of day

  return deadlines
    .filter(d => d.label && d.date) // remove any incomplete entries
    .map(d => {
      const deadlineDate = new Date(d.date);

      // Check if date is valid
      if (isNaN(deadlineDate.getTime())) {
        return {
          label:         d.label,
          date:          d.date,
          daysRemaining: null,
          status:        'invalid date',
        };
      }

      const diffMs   = deadlineDate - today;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // Determine status based on days remaining
      let status;
      if (diffDays < 0)        status = 'expired';
      else if (diffDays === 0) status = 'due today';
      else if (diffDays <= 7)  status = 'due soon';
      else if (diffDays <= 30) status = 'upcoming';
      else                     status = 'future';

      return {
        label:         d.label,
        date:          d.date,
        daysRemaining: diffDays,
        status,
      };
    });
};