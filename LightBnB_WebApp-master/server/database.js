const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool ({
  user: 'yavuztarikdengiz',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * FROM users
  WHERE email = $1
  `
  values = [email]
  
  return pool
  .query(queryString, values)
  .then(res => (res.rows[0] || null))
  .catch(err => err);

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT * FROM users
  WHERE id LIKE $1
  `
  values = [id];

  return pool
  .query(queryString, values)
  .then(res => res.rows[0] || null)
  .catch(err => err)

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString =`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `

  const values =[user.name, user.email, user.password]

  return pool
  .query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => err)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  queryString = `
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `
  const values = [guest_id, limit]

  return pool
  .query(queryString, values)
  .then(res => res.rows)
  .catch(err => err);



}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);

    queryString += `
    WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);

    if(options.city) {
      queryString += `
      AND properties.owner_id = $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.owner_id = $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);

    if(options.city || options.owner_id) {
      queryString += `
      AND properties.cost_per_night >= $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.cost_per_night >= $${queryParams.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);

    if(options.city || options.owner_id || options.minimum_price_per_night) {
      queryString += `
      AND properties.cost_per_night <= $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.cost_per_night <= $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating, limit);

    queryString += `
    GROUP BY properties.id
    HAVING AVG (property_reviews.rating) >= $${queryParams.length -1}
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  } else {
  

  
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  }
  // 5
  // console.log(queryString, queryParams);
  
  // 6
  return pool
  .query(queryString, queryParams)
  .then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
