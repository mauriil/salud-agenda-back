interface openTime {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface HealthCenter {
  _id: string;
  name: string;
  location: string;
  photo: string;
  openTime: openTime;
  userId: string;
}
