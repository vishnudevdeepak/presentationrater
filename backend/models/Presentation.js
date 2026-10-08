import mongoose from 'mongoose';
import { isFallbackMode } from '../config/database.js';
import { localPresentationStore } from '../config/localStore.js';

const presentationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  report: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

presentationSchema.index({ userId: 1, 'report.id': 1 }, { unique: true });

const MongoosePresentationModel = mongoose.models.Presentation || mongoose.model('Presentation', presentationSchema);

const Presentation = new Proxy(MongoosePresentationModel, {
  get(target, prop, receiver) {
    if (isFallbackMode()) {
      if (prop in localPresentationStore) {
        return localPresentationStore[prop];
      }
    }
    return Reflect.get(target, prop, receiver);
  }
});

export default Presentation;
