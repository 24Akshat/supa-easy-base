#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Dynamically import modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get arguments (skip first two: node and script path)
const args = process.argv.slice(2);

const command = args[0];

switch (command) {
  case undefined: {
    // No arguments: default to init()
    const { default: init } = await import('./scripts/init.js');
    await init();
    break;
  }
  case 'add-provider': {
    const provider = args[1];
    if (!provider) {
      console.error('Please specify a provider name (e.g., google or github)');
      process.exit(1);
    }
    const { default: addProvider } = await import('./scripts/addProvider.js');
    await addProvider(provider);
    break;
  }
  case 'generate-component': {
    const stack = args[1];
    if (!stack) {
      console.error('Please specify a stack name (mern or next)');
      process.exit(1);
    }
    const { default: generateComponent } = await import('./scripts/generateComponent.js');
    await generateComponent(stack);
    break;
  }
  default: {
    console.log(`
supa-easy-base CLI

Usage:
  npx supa-easy-base               # Initialize project (.env)
  npx supa-easy-base add-provider [provider]
  npx supa-easy-base generate-component [mern|next]
`);
    process.exit(0);
  }
}
