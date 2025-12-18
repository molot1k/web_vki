'use client';

import { useEffect } from 'react';
import useStudents from '@/hooks/useStudents';
import BackNavigation from '@/components/layout/BackNavigation/BackNavigation';
import styles from './StudentPage.module.scss';

interface Props {
  studentId: number;
}

const StudentPage = ({ studentId }: Props): React.ReactElement => {
  const { getStudent } = useStudents();
  const student = getStudent(studentId);

  if (!student) {
    return (
      <div className={styles.StudentPage}>
        <BackNavigation href="/students" text="список студентов" />
        <p>Студент не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.StudentPage}>
      <BackNavigation href="/students" text="список студентов" />
      
      <h1>{`${student.lastName} ${student.firstName} ${student.middleName}`}</h1>
      
      <div className={styles.info}>
        <div className={styles.field}>
          <span className={styles.label}>ID:</span>
          <span className={styles.value}>{student.id}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Фамилия:</span>
          <span className={styles.value}>{student.lastName}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Имя:</span>
          <span className={styles.value}>{student.firstName}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Отчество:</span>
          <span className={styles.value}>{student.middleName}</span>
        </div>
        
        {student.contacts && (
          <div className={styles.field}>
            <span className={styles.label}>Контакты:</span>
            <span className={styles.value}>{student.contacts}</span>
          </div>
        )}
        
        {student.group && (
          <div className={styles.field}>
            <span className={styles.label}>Группа:</span>
            <span className={styles.value}>{student.group.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;