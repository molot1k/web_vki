import AppDataSource from '../AppDataSource';

/**
 * Проверка подключения к базе данных
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    return AppDataSource.isInitialized;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

/**
 * Получение информации о базе данных
 */
export const getDatabaseInfo = () => {
  if (!AppDataSource.isInitialized) {
    return null;
  }

  return {
    type: AppDataSource.options.type,
    database: AppDataSource.options.database,
    entities: AppDataSource.entityMetadatas.map(entity => ({
      name: entity.name,
      tableName: entity.tableName,
      columns: entity.columns.map(col => ({
        propertyName: col.propertyName,
        type: col.type,
        isNullable: col.isNullable,
        isPrimary: col.isPrimary,
      })),
    })),
    isConnected: AppDataSource.isInitialized,
  };
};