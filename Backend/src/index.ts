// import {AppDataSource} from './databases/data-source';
// import {User} from './databases/entity/User';

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await AppDataSource.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await AppDataSource.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log(
//       'Here you can setup and run express / fastify / any other framework.'
//     );
//   })
//   .catch((error) => console.log(error));

import { Express, Request, Response } from 'express';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});