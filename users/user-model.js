const db = require('../data/dbConfig.js');

function find() {
    return db('users')
        .select('id', 'username');
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}


function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        });
}


module.exports = {find, findBy, add, findById}