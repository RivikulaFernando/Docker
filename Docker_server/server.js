// Simple Node.js server with DB connection
const http = require('http');
const { Client } = require('pg');

const PORT = 3000;
const DB_CONFIG = {
  host: process.env.POSTGRES_HOST || 'db',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'testdb',
  port: 5432
};

const server = http.createServer(async (req, res) => {
  const client = new Client(DB_CONFIG);
  try {
    await client.connect();
    const result = await client.query('SELECT NOW() as now');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('DB Connected! Time: ' + result.rows[0].now);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('DB Connection Error: ' + err.message);
  } finally {
    await client.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
