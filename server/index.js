// Run a server.
const port = 3654;
const server = require('./server');
server.listen(port, () => {console.log('listening...');});
