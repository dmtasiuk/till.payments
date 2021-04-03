export default {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'till_payments_demo',
}
