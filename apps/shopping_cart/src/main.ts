import express from 'express';
import RedisStore from 'connect-redis';
import session from 'express-session';

import { router } from './routes';
import { redisClient } from './core/database';
import { seedDB } from './core/database/seeds';

// Redis Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  ttl: 2 * 60 * 60,
});

const app = express();

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
      secure: app.get('env') === 'production',
      httpOnly: true,
      sameSite: 'strict',
    },
  })
);

app.use('/api/v1', router);

async function startServer() {
  try {
    await seedDB();

    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api/v1`);
    });
    server.on('error', (e) => {
      console.error('Unexpected error occurred', e);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();
