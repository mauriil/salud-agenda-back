import * as mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    healthCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCenter',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    startTimestamp: {
      type: String,
      required: true,
    },
    stopTimestamp: {
      type: String,
      required: true,
    },
    googleEventId: {
      type: String,
    },
  },
  { timestamps: true, collection: 'appointment' },
);
