import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { userRoutes } from './src/api/v1/routes/user/user-routes.js';
import { Error404 } from './src/utils/middlewares/404.js';
import { errorMiddleware } from './src/utils/middlewares/error-middleware.js';
import { createConnection } from './src/utils/db/connection.js';
import cors from 'cors';
import { judgeRoutes } from './src/api/v1/routes/judge/judge-routes.js';

dotenv.config();
const app = express();
app.set('trust proxy', 1);
app.use(cors({origin: '*'}));

// app.use(middleware);

app.use(express.json());
app.use('/', userRoutes);
app.use('/', judgeRoutes);
app.get('/health-check', (request, response) => {
    response.send('Online Judge API Up and Running');
});

app.use(Error404);
app.use(errorMiddleware);
const promise = createConnection();
promise.then(() =>{
    console.log(chalk.yellowBright.bold.bgCyanBright('DB is Up and Running'));

    const server = app.listen(process.env.PORT || 7777, err => {
    if(err){
        console.log(chalk.redBright.bold('Server Crash......'), err);
    }
    else{
        console.log(chalk.bgGreenBright.blueBright.bold('Server Up and Running ' + process.env.APP_NAME), server.address().port);
    }
})

}).catch(err => {
    console.error('DB Connection Failed....');
    process.exit(1);
})