import type StudentInterface from '@/types/StudentInterface';
import Link from 'next/link';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  const modifier = student.isDeleted ? '--isDeleted' : student.isNew ? '--isNew' : '';

  return (
    <div className={`${styles.Student} ${styles[modifier]}`}>
      <div className={styles.info}>
        <Link href={`/students/${student.id}`} className={styles.name}>
          {`${student.id || 'xxxx'} - ${student.lastName} ${student.firstName} ${student.middleName}`}
        </Link>
        {student.group && (
          <div className={styles.group}>
            Группа: {student.group.name}
          </div>
        )}
      </div>
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;
