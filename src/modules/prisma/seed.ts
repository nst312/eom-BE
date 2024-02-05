import { PrismaClient, Role } from '@prisma/client';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { WorldDataSeeder } from '../../../seeders/WorldDataSeeder';
import { PermissionSeeder } from '../../../seeders/PermissionSeeder';
const prisma = new PrismaClient();

const data = [
  { department_name: 'Accounts' },
  { department_name: 'Engineering' },
  { department_name: 'QA/Support' },
  { department_name: 'Human Resource' },
  { department_name: 'Business Analyst' },
  { department_name: 'Logistics' },
];

async function main() {
  // delete all the data and restart identity
  await prisma.$queryRaw`TRUNCATE TABLE department_master RESTART IDENTITY`;
  const departments = await prisma.department_master.createMany({
    data,
    skipDuplicates: true,
  });
  console.log({ departments });

  // NEED TO CHECK HOW WE WILL FETCH STATIC DATA
  const encryptedPass = await AuthHelpers.hash('oL#7Z#hH9yLUTju');

  await prisma.users.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin User',
      email: 'admin@ghanshyamdigital.com',
      password: encryptedPass.toString(),
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Super Admin Created');

  await prisma.users.create({
    data: {
      firstName: 'shyam',
      lastName: 'makwana',
      displayName: 'S Makwana',
      email: 'shyam@ghanshyamdigital.com',
      role: Role.CEO,
      password: encryptedPass.toString(),
      companies: {
        create: [
          {
            company_name: 'Ghanshyam Digital LLP',
            departments: {
              create: [
                { department_name: 'Accounts' },
                { department_name: 'Engineering' },
                { department_name: 'QA/Support' },
                { department_name: 'Human Resource' },
                { department_name: 'Business Analyst' },
              ],
            },
          },
        ],
      },
      employees: {
        create: {
          work_email: 'shyam@ghanshyamdigital.com',
          birth_date: new Date(),
          joining_date: new Date(),
        },
      },
    },
  });
  console.log('Created Company CEO');

  const department = await prisma.company_departments.findFirst();
  const company = await prisma.companies.findFirst();
  await prisma.users.create({
    data: {
      firstName: 'Shyam',
      lastName: 'Employee',
      displayName: 'Shyam Employee',
      email: 'shyam@emp.com',
      role: Role.EMPLOYEE,
      password: encryptedPass.toString(),
      employees: {
        create: {
          work_email: 'shyam@emp.com',
          birth_date: new Date(),
          joining_date: new Date(),
          jobPosition: {
            create: {
              jobPosition: 'kkk',
              company_department: {
                connect: {
                  id: department.id,
                },
              },
            },
          },
        },
      },
      companies: {
        connect: {
          id: company.id,
        },
      },
    },
  });

  console.log('Company Admin Created Employee');

  const worldSeeder = new WorldDataSeeder();
  await worldSeeder.countries();
  await worldSeeder.states();
  await worldSeeder.cities();
  const permissionSeeder = new PermissionSeeder();
  await permissionSeeder.permission();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
