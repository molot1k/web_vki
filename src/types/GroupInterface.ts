import type StudentInterface from './StudentInterface';

interface GroupInterface {
  id: number;
  name: string;
  contacts: string;
  students?: StudentInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  studentsCount?: number;
}

export default GroupInterface;
