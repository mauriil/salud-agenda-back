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
    payment: {
      type: {
        type: String,
        enum: ['personal', 'mercadopago'],
        required: true,
      },
      payToConfirm: {
        type: Boolean,
        default: false,
      },
      hasToPay: {
        type: String,
        default: '0%',
        enum: ['0%', '50%', '100%'],
      },
      payed: {
        type: Boolean,
        default: false,
      },
      paymentId: {
        type: String,
      },
      paymentUrl: {
        type: String,
      },
    },
  },
  { timestamps: true, collection: 'appointment' },
);
