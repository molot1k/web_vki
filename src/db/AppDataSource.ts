import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web-orm.db',
  entities: [Group, Student],
  synchronize: true,
  logging: false, // Отключаем логирование для избежания проблем
  cache: false,
});

// Функция для создания тестовых данных
const createTestData = async () => {
  try {
    const groupRepository = AppDataSource.getRepository(Group);
    const studentRepository = AppDataSource.getRepository(Student);

    // Проверяем есть ли уже данные
    const existingGroups = await groupRepository.count();
    if (existingGroups > 0) {
      console.log('📊 Test data already exists');
      return;
    }

    // Создаем тестовые группы
    const testGroups = [
      {
        name: 'ИС-21-1',
        contacts: 'is21-1@vki.ru, тел: +7(123)456-78-90'
      },
      {
        name: 'ИС-21-2', 
        contacts: 'is21-2@vki.ru, тел: +7(123)456-78-91'
      },
      {
        name: 'ПИ-21-1',
        contacts: 'pi21-1@vki.ru, тел: +7(123)456-78-92'
      }
    ];

    const savedGroups = await groupRepository.save(testGroups);
    console.log(`✅ Created ${savedGroups.length} test groups`);

    // Создаем тестовых студентов
    const testStudents = [
      // Группа ИС-21-1
      { firstName: 'Иван', lastName: 'Иванов', middleName: 'Иванович', contacts: 'ivan@example.com', groupId: savedGroups[0].id },
      { firstName: 'Петр', lastName: 'Петров', middleName: 'Петрович', contacts: 'petr@example.com', groupId: savedGroups[0].id },
      { firstName: 'Сидор', lastName: 'Сидоров', middleName: 'Сидорович', contacts: 'sidor@example.com', groupId: savedGroups[0].id },
      
      // Группа ИС-21-2
      { firstName: 'Анна', lastName: 'Анненко', middleName: 'Анатольевна', contacts: 'anna@example.com', groupId: savedGroups[1].id },
      { firstName: 'Мария', lastName: 'Маркова', middleName: 'Михайловна', contacts: 'maria@example.com', groupId: savedGroups[1].id },
      
      // Группа ПИ-21-1
      { firstName: 'Алексей', lastName: 'Алексеев', middleName: 'Алексеевич', contacts: 'alex@example.com', groupId: savedGroups[2].id },
      { firstName: 'Дмитрий', lastName: 'Дмитриев', middleName: 'Дмитриевич', contacts: 'dmitry@example.com', groupId: savedGroups[2].id },
      { firstName: 'Николай', lastName: 'Николаев', middleName: 'Николаевич', contacts: 'nikolay@example.com', groupId: savedGroups[2].id },
      
      // Студент без группы
      { firstName: 'Олег', lastName: 'Олегов', middleName: 'Олегович', contacts: 'oleg@example.com', groupId: null },
    ];

    const savedStudents = await studentRepository.save(testStudents);
    console.log(`✅ Created ${savedStudents.length} test students`);
    
  } catch (error) {
    console.error('❌ Error creating test data:', error);
  }
};

// Простая инициализация
AppDataSource.initialize()
  .then(async () => {
    console.log('✅ TypeORM DataSource initialized successfully!');
    // Создаем тестовые данные после инициализации
    await createTestData();
  })
  .catch((err) => {
    console.error('❌ TypeORM initialization error:', err.message);
  });

export default AppDataSource;
