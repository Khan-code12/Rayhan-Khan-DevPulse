import app from './app.js';
import { config } from './config/env.js';
import { createTables } from './database/createTables.js';
import { initTriggers } from './database/triggers.js';
import { runSeed } from './database/seed.js';

const launchDevPulseAppInstance = async () => {
  try {
    console.log('Loading underlying database table scripts mapping configurations...');
    
    // Auto schema validation scripts execution flow synchronization sequence
    await createTables();
    await initTriggers();
    await runSeed();

    app.listen(config.port, () => {
      console.log(`🚀 DevPulse system tracking modules successfully connected on execution port: ${config.port}`);
    });
  } catch (error) {
    console.error('💥 DevPulse core micro-engine boot context initialization failed check exception:', error);
    process.exit(1);
  }
};

launchDevPulseAppInstance();