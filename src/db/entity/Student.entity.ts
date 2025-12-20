import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';

@Entity('students') // Явное указание имени таблицы
@Index(['lastName', 'firstName']) // Индекс для быстрого поиска по ФИО
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ 
    type: 'varchar',
    length: 36,
    nullable: true,
    unique: true,
    comment: 'Уникальный идентификатор UUID'
  })
  uuid?: string;

  @Column({ 
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'Имя студента'
  })
  firstName!: string;

  @Column({ 
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'Фамилия студента'
  })
  lastName!: string;

  @Column({ 
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'Отчество студента'
  })
  middleName!: string;

  @Column({ 
    type: 'text',
    nullable: true,
    comment: 'Контактная информация студента'
  })
  contacts?: string;

  @Column({ 
    nullable: true,
    comment: 'ID группы студента'
  })
  @Index() // Индекс для внешнего ключа
  groupId?: number;

  @ManyToOne('Group', 'students', { 
    nullable: true,
    onDelete: 'SET NULL', // При удалении группы, установить NULL
    eager: false, // Не загружать автоматически
  })
  @JoinColumn({ name: 'groupId' })  
  group?: any;

  @CreateDateColumn({
    comment: 'Дата создания записи'
  })
  createdAt!: Date;

  @UpdateDateColumn({
    comment: 'Дата последнего обновления записи'
  })
  updatedAt!: Date;

  // Виртуальное поле для полного имени
  get fullName(): string {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
  }

  // Виртуальное поле для инициалов
  get initials(): string {
    return `${this.lastName} ${this.firstName.charAt(0)}.${this.middleName.charAt(0)}.`;
  }
}
