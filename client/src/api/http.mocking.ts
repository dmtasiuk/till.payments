import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import * as paths from './paths';
import pathToRegexp from 'path-to-regexp';

const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 2000 });

const fakeUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`;

  return {
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    fullName,
    email: faker.internet.email().toLowerCase(),
  };
};

const fakeCustomer = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`;

  return {
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    fullName,
    email: faker.internet.email().toLowerCase(),
    merchantId: 'jack',
  };
};

mock.onGet(paths.AUTH_VERIFY).reply(400);

mock.onPost(paths.AUTH_LOGIN).reply(200, fakeUser(), {
  AuthToken: faker.datatype.uuid(),
});

mock.onGet(paths.CUSTOMERS_LIST).reply(config => {
  const { limit, search } = config.params;
  const items = Array.from(Array(limit))
    .map(() => fakeCustomer())
    .filter(({ email, fullName }) => {
      const handleMatches = () => {
        return (
          email.indexOf(search) !== -1 || fullName.indexOf(search) !== undefined
        );
      };
      return !search ? true : handleMatches();
    });
  return [
    200,
    {
      items,
      meta: {
        itemCount: 10,
        totalItems: 20,
        itemsPerPage: 10,
        totalPages: 5,
        currentPage: 2,
      },
      links: {
        first: 'http://cats.com/cats?limit=10',
        previous: 'http://cats.com/cats?page=1&limit=10',
        next: 'http://cats.com/cats?page=3&limit=10',
        last: 'http://cats.com/cats?page=5&limit=10',
      },
    },
  ];
});

mock.onPost(paths.CUSTOMERS_CREATE).reply(({ data }) => {
  const response = JSON.parse(data);

  response.id = faker.datatype.uuid();
  response.fullName = `${response.firstName} ${response.lastName}`;

  return [201, response];
});

mock.onPut(pathToRegexp(paths.CUSTOMERS_UPDATE)).reply(({ data }) => {
  const response = JSON.parse(data);

  response.fullName = `${response.firstName} ${response.lastName}`;

  return [202, response];
});

mock.onDelete(pathToRegexp(paths.CUSTOMERS_DELETE)).reply(204);
