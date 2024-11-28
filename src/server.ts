import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  // Connect to the MongoDB database
  await mongoose.connect(config.database_url as string);

  // start the express server on dedicated port
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

// Entry point for the application
main();
