npm init -y
npm install express

//index.js
/*
 * const express = require('express')
const app = express()
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
*/

npm install sequelize sequelize-cli pg pg-hstore

//index.js
/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
*/

//index.js
/*
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
*/

npx sequelize init

npx sequelize model:generate --name page_loads --attributes userAgent:string,time:date
