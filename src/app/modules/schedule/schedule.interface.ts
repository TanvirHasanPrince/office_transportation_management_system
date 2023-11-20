import { Model, Types } from 'mongoose';

export enum DropOffTime {
  '10:15 PM' = '10:15 PM',
  '11:15 PM' = '11:15 PM',
  '12:15 AM' = '12:15 AM',
  '01:15 AM' = '01:15 AM',
  '02:15 AM' = '02:15 AM',
  '03:15 AM' = '03:15 AM',
  '04:15 AM' = '04:15 AM',
  '05:15 AM' = '05:15 AM',
  '06:15 AM' = '06:15 AM',
  '07:30 AM' = '07:30 AM',
  '08:30 AM' = '08:30 AM',
}

export type ISchedule = {
  id: number;
  date: string;
  driver: Types.ObjectId; //driverId
  location: Types.ObjectId; //locationId
  dropOffTime: DropOffTime;
};

export type ScheduleModel = Model<ISchedule, Record<string, unknown>>;

export type IScheduleFilters = {
  searchTerm?: string;
  driver?: string;
  location?: string;
  dropOffTime?: string;
};
