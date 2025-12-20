import { Group } from './entity/Group.entity';
import AppDataSource from './AppDataSource';
import type GroupInterface from '@/types/GroupInterface';

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

const getGroupRepository = async () => {
  await waitForDatabase();
  return AppDataSource.getRepository(Group);
};

/**
 * Получение групп
 * @returns  Promise<GroupInterface[]>
 */
export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const groupRepository = await getGroupRepository();
  return await groupRepository.find({ relations: ['students'] });
};

/**
 * Добавление группы
 * @returns  Promise<GroupInterface>
 */
export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  const groupRepository = await getGroupRepository();
  const group = new Group();
  const newGroup = await groupRepository.save({
    ...group,
    ...groupFields,
  });

  return newGroup;
};
