const server = require('./api/server');

const PORT = process.env.PORT || 4000;
server.liste(PORT, () => console.log(`\n** listening on port ${PORT} **\n`))