import mysql from 'mysql'

import { config } from 'dotenv'

config()

export const db = mysql.createConnection({
    host: process.env.DB_HOST || '10.12.100.14',
    user: process.env.DB_USER || 'sysweb',
    database: process.env.DB_DATABASE || 'snapsteps',
    password: process.env.DB_PASSWORD || 'ZqkNUCy9DnPjGuSG'
})
