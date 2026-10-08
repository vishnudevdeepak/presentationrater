import Presentation from '../models/Presentation.js';

const serializePresentation = (record) => {
  const createdAtStr = record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString();
  return {
    ...record.report,
    id: record.report.id,
    userId: (record.userId || '').toString(),
    analyzedAt: record.report.analyzedAt || createdAtStr.split('T')[0]
  };
};

export const listPresentations = async (req, res) => {
  const userId = (req.user.id || req.user._id)?.toString();
  const records = await Presentation.find({ userId }).sort({ createdAt: -1 });
  res.json(records.map(serializePresentation));
};

export const createPresentation = async (req, res) => {
  const report = req.body;
  if (!report || typeof report !== 'object' ||
      typeof report.id !== 'string' || !report.id ||
      typeof report.title !== 'string' || !Number.isFinite(report.overallScore)) {
    return res.status(400).json({ message: 'A valid presentation analysis report is required.' });
  }

  const userId = (req.user.id || req.user._id)?.toString();
  let record = await Presentation.findOne({
    userId,
    'report.id': report.id
  });

  if (record) {
    record.report = report;
    if (typeof record.save === 'function') {
      await record.save();
    }
  } else {
    record = await Presentation.create({ userId, report });
  }

  res.status(201).json(serializePresentation(record));
};

export const getPresentation = async (req, res) => {
  const userId = (req.user.id || req.user._id)?.toString();
  const record = await Presentation.findOne({
    userId,
    'report.id': req.params.id
  });
  if (!record) {
    return res.status(404).json({ message: 'Presentation analysis not found.' });
  }
  res.json(serializePresentation(record));
};

export const removePresentation = async (req, res) => {
  const userId = (req.user.id || req.user._id)?.toString();
  const result = await Presentation.deleteOne({
    userId,
    'report.id': req.params.id
  });
  if (!result || !result.deletedCount) {
    return res.status(404).json({ message: 'Presentation analysis not found.' });
  }
  res.status(204).end();
};
