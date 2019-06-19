import Server from './server/server';
require('./config/config');

const server = Server.init(process.env.PORT);

server.start(() => {
    console.log(`Listening port ${process.env.PORT}...`);
});