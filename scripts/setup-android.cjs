#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const androidRoot = path.join(root, 'android');
const appRoot = path.join(androidRoot, 'app');
const resRoot = path.join(appRoot, 'src', 'main', 'res');
const sourceIcon = path.join(root, 'public', 'icon-512.png');
const sourceRoundIcon = path.join(root, 'public', 'icon-192.png');

if (!fs.existsSync(androidRoot)) {
  throw new Error('android/ does not exist. Run `npx cap add android` first.');
}
if (!fs.existsSync(sourceIcon)) {
  throw new Error(`Missing ${sourceIcon}`);
}

// Keep this script intentionally small: Capacitor owns the generated Android
// project, while this script applies only Hisab-specific native customization.
const drawable = path.join(resRoot, 'drawable');
fs.mkdirSync(drawable, { recursive: true });
fs.copyFileSync(sourceIcon, path.join(drawable, 'hisab_icon.png'));
if (fs.existsSync(sourceRoundIcon)) {
  fs.copyFileSync(sourceRoundIcon, path.join(drawable, 'hisab_icon_round.png'));
}

const manifestPath = path.join(appRoot, 'src', 'main', 'AndroidManifest.xml');
let manifest = fs.readFileSync(manifestPath, 'utf8');
manifest = manifest.replace(/android:icon="@mipmap\/ic_launcher"/, 'android:icon="@drawable/hisab_icon"');
manifest = manifest.replace(/android:roundIcon="@mipmap\/ic_launcher_round"/, 'android:roundIcon="@drawable/hisab_icon_round"');
fs.writeFileSync(manifestPath, manifest);

const stringsPath = path.join(appRoot, 'src', 'main', 'res', 'values', 'strings.xml');
if (fs.existsSync(stringsPath)) {
  let strings = fs.readFileSync(stringsPath, 'utf8');
  strings = strings.replace(/<string name="app_name">.*?<\/string>/, '<string name="app_name">Hisab</string>');
  fs.writeFileSync(stringsPath, strings);
}

console.log('[hisab] Applied native Android branding.');
