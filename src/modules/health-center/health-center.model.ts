import * as mongoose from 'mongoose';

export const HealthCenterSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    photo: String,
    openTime: {
      Monday: String,
      Tuesday: String,
      Wednesday: String,
      Thursday: String,
      Friday: String,
      Saturday: String,
      Sunday: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, collection: 'healthCenter' },
);
