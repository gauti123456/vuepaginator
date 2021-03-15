import faker from "faker";
let users = [];
let fetchedUsers = [];

const addFakerUsers = number => {
  for (let i = 1; i <= number; i++) {
    users = [
      ...users,
      {
        id: i,
        name: faker.name.findName(),
        country: ["the united states", "canada"][
          `${Math.floor(Math.random() * Math.floor(2))}`
        ],
        cover:
          "https://placeimg.com/250/150/nature?" +
          Math.random()
            .toString(36)
            .substring(2),
        profile:
          "https://placeimg.com/150/250/people?" +
          Math.random()
            .toString(36)
            .substring(2),
        gender: ["male", "female"][
          `${Math.floor(Math.random() * Math.floor(2))}`
        ],
        intro: faker.lorem.sentence(),
        bio: faker.lorem.paragraph()
      }
    ];
  }
};

addFakerUsers(40);

const itemsPerPage = 2;

export default {
  getUsers(url) {
    fetchedUsers = users;

    let query = url.match(/\?(.+)/);

    let queryString = query ? query[0] : "";

    if (!queryString) {
      return usersInPage(1);
    }

    let queryParams = queryStringToObj(queryString);

    let page = queryParams.page;

    page = page ? page : 1;

    return usersInPage(page);
  }
};

function usersInPage(page) {
  let returnedUsers = fetchedUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  let last_page = Math.round(fetchedUsers.length / itemsPerPage);

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve({
        data: returnedUsers,
        meta: {
          current_page: parseInt(page),
          last_page,
          total: fetchedUsers.length
        }
      });
    }, 500);
  });
}

function queryStringToObj(queryString) {
  let obj = {};
  let query = queryString.substring(1);

  if (query) {
    query.split("&").forEach(param => {
      let [key, val] = param.split("=");
      if (val) {
        obj[key] = decodeURIComponent(val);
      }
    });
  }

  return obj;
}
