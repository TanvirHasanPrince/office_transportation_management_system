import { Schema, model } from 'mongoose';
import { DropOffTime, ISchedule, ScheduleModel } from './schedule.interface';

const ScheduleSchema = new Schema<ISchedule, ScheduleModel>(
  {
    id: Number,
    date: String,
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' }, // Reference to the Driver model
    location: { type: Schema.Types.ObjectId, ref: 'Location' }, // Reference to the Location model
    dropOffTime: {
      type: String,
      enum: Object.values(DropOffTime),
    },
  },
  {
    timestamps: true,
  },
);

export const Schedule = model<ISchedule, ScheduleModel>(
  'Schedule',
  ScheduleSchema,
);
