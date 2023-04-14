import * as mongoose from 'mongoose';

export const PatientsSchema = new mongoose.Schema(
  {
    name: String,
    dob: String,
    email: String,
    phone: String,
    healthCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCenter',
    },
  },
  { timestamps: true, collection: 'patients' },
);
