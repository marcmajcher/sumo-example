'use strict';

/* eslint-env node */

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sumo-example'
  },
  production: {
    client: 'pg',
    connection: 'postgres://bfwtiiuivsvhvn:c158b926b245b293acaf6d4460953821d246634716b518c068e941eb8b2e907a@ec2-54-197-233-123.compute-1.amazonaws.com:5432/d3bafhicvo595o'
  }
};
