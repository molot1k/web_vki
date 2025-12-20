import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import AppDataSource from './AppDataSource';

/**
 * Ожидание инициализации базы данных
 */
const waitForDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    // Ждем до 5 секунд пока база инициализируется
    for (let i = 0; i < 50; i++) {
      if (AppDataSource.isInitialized) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  if (!AppDataSource.isInitialized) {
    throw new Error('Database not initialized');
  }
};

const getStudentRepository = async () => {
  await waitForDatabase();
  return AppDataSource.getRepository(Student);
};

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const studentRepository = await getStudentRepository();
  return await studentRepository.find({ relations: ['group'] });
};

/**
 * Получение студента по ID
 * @param studentId ИД студента
 * @returns Promise<StudentInterface | null>
 */
export const getStudentDb = async (studentId: number): Promise<StudentInterface | null> => {
  const studentRepository = await getStudentRepository();
  return await studentRepository.findOne({ 
    where: { id: studentId },
    relations: ['group']
  });
};

/**
 * Удаления студента
 * @param studentId ИД удаляемого студента
 * @returns Promise<number>
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const studentRepository = await getStudentRepository();
  await studentRepository.delete(studentId);
  return studentId;
};

/**
 * Добавление студента
 * @param studentField поля студента
 * @returns Promise<StudentInterface>
 */
export const addStudentDb = async (studentFields: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const studentRepository = await getStudentRepository();
  const student = new Student();
  const newStudent = await studentRepository.save({
    ...student,
    ...studentFields,
  });
  return newStudent;
};

/**
 * Добавление рандомных студента
 * @param amount количество рандомных записей
 * @returns Promise<StudentInterface>
 */
export const addRandomStudentsDb = async (amount: number = 10): Promise<StudentInterface[]> => {
  const students: StudentInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();

    const newStudent = await addStudentDb({
      ...fio,
      contacts: 'contact',
      groupId: 1,
    });
    students.push(newStudent);
  }

  return students;
};
