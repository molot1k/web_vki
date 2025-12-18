'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import type StudentInterface from '@/types/StudentInterface';
import Link from 'next/link';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.id} className={styles.group}>
          <h2 className={styles.groupName}>{group.name}</h2>
          <div className={styles.contacts}>Контакты: {group.contacts}</div>
          
          {group.students && group.students.length > 0 ? (
            <div className={styles.students}>
              <h3>Студенты группы:</h3>
              <ul className={styles.studentsList}>
                {group.students.map((student: StudentInterface) => (
                  <li key={student.id} className={styles.student}>
                    <Link href={`/students/${student.id}`} className={styles.studentLink}>
                      {`${student.lastName} ${student.firstName} ${student.middleName}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.noStudents}>В группе пока нет студентов</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Groups;
