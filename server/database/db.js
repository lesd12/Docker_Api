import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('./server/database/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
