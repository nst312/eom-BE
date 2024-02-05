import { PrismaClient, Role } from '@prisma/client';
import { AuthHelpers } from '../src/shared/helpers/auth.helpers';
import { WorldDataSeeder } from '../seeders/WorldDataSeeder';

const prisma = new PrismaClient();

const data = [
  { id: 1, department_name: 'Accounts' },
  { id: 2, department_name: 'Engineering' },
  { id: 3, department_name: 'QA/Support' },
  { id: 4, department_name: 'Human Resource' },
  { id: 5, department_name: 'Business Analyst' },
  { id: 6, department_name: 'Logistics' },
  { id: 7, department_name: 'Frontend' },
  { id: 8, department_name: 'Backend' },
  { id: 9, department_name: 'DevOps' },
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
  const encryptedPass = await AuthHelpers.hash('Karan123#');

  const users = [
    {
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin User',
      email: 'admin@ghanshyamdigital.com',
      password: encryptedPass.toString(),
      role: Role.SUPER_ADMIN,
    },
    {
      firstName: 'shyam',
      lastName: 'makwana',
      displayName: 'S Makwana',
      email: 'shyam@ghanshyamdigital.com',
      role: Role.COMPANY_ADMIN,
      password: encryptedPass.toString(),
      companies: {
        create: [
          {
            id: 1,
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
          department: {
            create: {
              department_name: 'Accounts',
              companies: {
                connect: {
                  id: 1,
                },
              },
            },
          },
        },
      },
    },
    {
      firstName: 'gopal',
      lastName: 'makwana',
      displayName: 'G Makwana',
      email: 'gopal@softwares.com',
      role: Role.COMPANY_ADMIN,
      password: encryptedPass.toString(),
      companies: {
        create: [
          {
            id: 2,
            company_name: 'Gopal Softwares',
            departments: {
              create: [
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
          work_email: 'gopal@softwares.com',
          birth_date: new Date(),
          joining_date: new Date(),
          department: {
            create: {
              department_name: 'Accounts',
              companies: {
                connect: {
                  id: 2,
                },
              },
            },
          },
        },
      },
    },
  ];

  const usersQuery = users.map((user) => prisma.users.create({ data: user }));

  await prisma.$transaction(usersQuery);

  const invitation = {
    data: {
      firstName: 'Shyam',
      lastName: 'Makwana',
      email: 'newuser@ghanshyamdigital.com',
      token: 'somerandomstringtoken',
      company_id: 1,
    },
  };
  await prisma.invitations.create(invitation);

  const worldSeeder = new WorldDataSeeder();
  await worldSeeder.countries(1);
  await worldSeeder.states(35);
  await worldSeeder.cities(300);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
