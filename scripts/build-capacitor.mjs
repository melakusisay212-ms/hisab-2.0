#!/usr/bin/env node
import { spawn } from 'node:child_process';

const env = {
  ...process.env,
  VITE_AUTH_ENABLED: 'false',
  VITE_CAPACITOR_BUILD: 'true',
};

const child = spawn(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'build'],
  { stdio: 'inherit', env },
);

child.on('error', (error) => {
  console.error('[hisab] mobile build failed to start:', error);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`[hisab] mobile build stopped by ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});
