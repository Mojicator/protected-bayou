import Server from './server/server';
import Mongodb from './database/mongodb';
import { PORT, URLDB } from './config/config';

const server = Server.init(PORT);

const database = Mongodb.init(URLDB);

database.mongoSetup((err: any) => {
    if (err) throw err;
    console.log('Database online');
});

server.start(() => {
    console.log(`Listening port ${PORT}...`);
});