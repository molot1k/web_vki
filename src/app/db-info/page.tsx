'use client';

import { useEffect, useState } from 'react';
import Page from '@/components/layout/Page/Page';
import styles from './page.module.scss';

interface DbInfo {
  type: string;
  database: string;
  entities: Array<{
    name: string;
    tableName: string;
    columns: Array<{
      propertyName: string;
      type: string;
      isNullable: boolean;
      isPrimary: boolean;
    }>;
  }>;
  isConnected: boolean;
}

const DbInfoPage = (): React.ReactElement => {
  const [dbInfo, setDbInfo] = useState<DbInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDbInfo = async () => {
      try {
        const response = await fetch('/api/db-info');
        const result = await response.json();
        
        if (response.ok) {
          setDbInfo(result.data);
        } else {
          setError(result.error || 'Failed to fetch database info');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchDbInfo();
  }, []);

  if (loading) {
    return (
      <Page>
        <h1>Информация о базе данных TypeORM</h1>
        <p>Загрузка...</p>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <h1>Информация о базе данных TypeORM</h1>
        <div className={styles.error}>Ошибка: {error}</div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={styles.dbInfo}>
        <h1>Информация о базе данных TypeORM</h1>
        
        {dbInfo && (
          <>
            <div className={styles.section}>
              <h2>Подключение</h2>
              <div className={styles.info}>
                <div className={styles.row}>
                  <span className={styles.label}>Тип БД:</span>
                  <span className={styles.value}>{dbInfo.type}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>База данных:</span>
                  <span className={styles.value}>{dbInfo.database}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Статус:</span>
                  <span className={`${styles.value} ${styles.connected}`}>
                    {dbInfo.isConnected ? '✅ Подключено' : '❌ Не подключено'}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Сущности ({dbInfo.entities.length})</h2>
              {dbInfo.entities.map((entity) => (
                <div key={entity.name} className={styles.entity}>
                  <h3>{entity.name}</h3>
                  <p className={styles.tableName}>Таблица: {entity.tableName}</p>
                  
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Поле</th>
                        <th>Тип</th>
                        <th>Nullable</th>
                        <th>Primary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.columns.map((column) => (
                        <tr key={column.propertyName}>
                          <td>{column.propertyName}</td>
                          <td><code>{column.type}</code></td>
                          <td>{column.isNullable ? '✓' : '✗'}</td>
                          <td>{column.isPrimary ? '🔑' : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Page>
  );
};

export default DbInfoPage;