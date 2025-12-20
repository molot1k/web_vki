import type GroupInterface from './GroupInterface';

interface StudentInterface {
  id: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  contacts?: string;
  groupId?: number;
  group?: GroupInterface;
  createdAt?: Date;
  updatedAt?: Date;
  fullName?: string;
  initials?: string;
  isDeleted?: boolean;
  isNew?: boolean;
}

export default StudentInterface;
