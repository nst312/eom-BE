import { cities, PrismaClient, states } from '@prisma/client';
const prisma = new PrismaClient();
const fs = require('fs');

export class WorldDataSeeder {
  async countries(count: number = null) {
    console.log('countries import started');
    return new Promise((resolve) => {
      return fs.readFile(
        __dirname + '/countries.json',
        'utf8',
        async function (err, res) {
          const data = JSON.parse(res);
          const countriesQuery = data
            .splice(0, count ? count : data.length)
            .map((country) => {
              const timezones = country.timezones;
              delete country.timezones;
              delete country.translations;
              const data = {
                ...country,
                timezones: {
                  create: timezones,
                },
              };
              return prisma.countries.create({ data });
            });
          await prisma.$transaction(countriesQuery);
          resolve(true);
          // console.log('states', this);
          // console.log('states', states);
          // await states();
        },
      );
    });
  }

  async states(count: number = null) {
    console.log('states import started');
    return new Promise((resolve) => {
      return fs.readFile(
        __dirname + '/states.json',
        'utf8',
        async function (err, res) {
          const data = JSON.parse(res) as states[];
          const states = await prisma.states.createMany({
            data: data.splice(0, count ? count : data.length),
          });
          // const statesQueries = data.map((state) => {
          //   return prisma.states.create({ data: state });
          // });
          // await prisma.$transaction(statesQueries);
          console.log('states', states);
          console.log(states.count + ' states seeded');
          resolve(true);
        },
      );
    });
  }

  async cities(count: number = null) {
    console.log('cities import started');
    return new Promise((resolve) => {
      return fs.readFile(
        __dirname + '/cities.json',
        'utf8',
        async function (err, res) {
          const data = JSON.parse(res) as cities[];

          const cities = await prisma.cities.createMany({
            data: data.splice(0, count ? count : data.length),
          });
          console.log('cities', cities);

          // const citiesQueries = data.map((city) => {
          //   return prisma.cities.create({ data: city });
          // });
          // await prisma.$transaction(citiesQueries);
          console.log(cities.count + ' cities seeded');
          resolve(true);
        },
      );
    });
  }
}
//
// export async function states() {
//   // await fs.readFile(
//   //   __dirname + '/states.json',
//   //   'utf8',
//   //   async function (err, res) {
//   //     const data = JSON.parse(res) as states[];
//   //     const statesQueries = [data[0]].map((state) => {
//   //       console.log('state', state);
//   //       return prisma.states.create({ data: state });
//   //     });
//   //     await prisma.$transaction(statesQueries);
//   //     console.log(data.length + ' states seeded');
//   //   },
//   // );
//   // axios
//   //   .get(
//   //     'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json',
//   //   )
//   //   .then(async (res) => {
//   //     const statesQueries = res.data.map((state) => {
//   //       return prisma.states.create({ data: state });
//   //     });
//   //     await prisma.$transaction(statesQueries);
//   //     console.log('states seeded');
//   //   });
// }
//
// export async function countries() {
//   // fs.readFile(
//   //   __dirname + '/countries+states+cities.json',
//   //   'utf8',
//   //   async function (err, res) {
//   //     const data = JSON.parse(res);
//   //     const countriesQuery = data.map((country) => {
//   //       const timezones = country.timezones;
//   //       const states = country.states.map((state) => {
//   //         const { cities } = state;
//   //         delete state.cities;
//   //         state.cities = {
//   //           create: cities,
//   //         };
//   //         return state;
//   //       });
//   //       delete country.timezones;
//   //       delete country.states;
//   //       delete country.translations;
//   //       const data = {
//   //         ...country,
//   //         timezones: {
//   //           create: timezones,
//   //         },
//   //         states: {
//   //           create: states,
//   //         },
//   //       };
//   //       return prisma.countries.create({ data });
//   //     });
//   //     Promise.allSettled(countriesQuery).then((res) => {
//   //       console.log('res', res);
//   //     });
//   //     // await prisma.$transaction(countriesQuery);
//   //     console.log(data.length + ' countries seeded');
//   //   },
//   // );
//   // console.log('countries import started');
//   // await fs.readFile(
//   //   __dirname + '/countries.json',
//   //   'utf8',
//   //   async function (err, res) {
//   //     const data = JSON.parse(res);
//   //     const countriesQuery = data.map((country) => {
//   //       const timezones = country.timezones;
//   //       delete country.timezones;
//   //       delete country.translations;
//   //       const data = {
//   //         ...country,
//   //         timezones: {
//   //           create: timezones,
//   //         },
//   //       };
//   //       return prisma.countries.create({ data });
//   //     });
//   //     await prisma.$transaction(countriesQuery);
//   //     console.log(data.length + ' countries seeded');
//   //     console.log('states import started');
//   //     console.log('states', states);
//   //     // await states();
//   //   },
//   // );
//   // axios
//   //   .get(
//   //     'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json',
//   //   )
//   //   .then(async (res) => {
//   //     const countriesQuery = res.data.map((country) => {
//   //       const timezones = country.timezones;
//   //       delete country.timezones;
//   //       delete country.translations;
//   //       const data = {
//   //         ...country,
//   //         timezones: {
//   //           create: timezones,
//   //         },
//   //       };
//   //       return prisma.countries.create({ data });
//   //     });
//   //     await prisma.$transaction(countriesQuery);
//   //     console.log('countries seeded');
//   //   });
// }
//
// export async function cities() {
//   // axios
//   //   .get(
//   //     'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json',
//   //   )
//   //   .then(async (res) => {
//   //     const citiesQueries = res.data.map((state) => {
//   //       return prisma.cities.create({ data: state });
//   //     });
//   //     await prisma.$transaction(citiesQueries);
//   //     console.log('cities seeded');
//   //   });
// }
