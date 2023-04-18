export interface paymentInterface {
  type: string;
  payToConfirm: boolean;
  hasToPay: string;
  payed: boolean;
  paymentId: string;
  paymentUrl: string;
}

export interface Appointment {
  _id: string;
  userId: string;
  patientId: string;
  title: string;
  description: string;
  amount: number;
  startTimestamp: string;
  stopTimestamp: string;
  googleEventId: string;
  payment: paymentInterface;
}
