import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('groups') // Явное указание имени таблицы
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ 
    type: 'varchar', 
    length: 100,
    nullable: false,
    comment: 'Название группы'
  })
  name!: string;

  @Column({ 
    type: 'text',
    nullable: true,
    comment: 'Контактная информация группы'
  })
  contacts!: string;

  @OneToMany('Student', 'group', {
    cascade: true, // Каскадные операции
    eager: false,  // Не загружать автоматически
  })
  students!: any[];

  @CreateDateColumn({
    comment: 'Дата создания записи'
  })
  createdAt!: Date;

  @UpdateDateColumn({
    comment: 'Дата последнего обновления записи'
  })
  updatedAt!: Date;

  // Виртуальное поле для подсчета студентов
  get studentsCount(): number {
    return this.students ? this.students.length : 0;
  }
}
