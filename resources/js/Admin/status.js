export const STATUS = {
  new: 'جديد',
  read: 'مقروء',
  replied: 'تم الرد',
  archived: 'مؤرشف',
};

export const statusLabel = (s) => STATUS[s] || s;

export const fmtDate = (s) => {
  if (!s) return '';
  try {
    return new Date(s).toLocaleString('ar-EG-u-nu-latn', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return s;
  }
};
