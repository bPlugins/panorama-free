const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Helper to dynamically find Local by Flywheel's PHP folder
function locateFlywheelPhp() {
  const localAppData = process.env.LOCALAPPDATA;
  if (!localAppData) return null;

  const servicesDir = path.join(localAppData, 'Programs', 'Local', 'resources', 'extraResources', 'lightning-services');
  if (!fs.existsSync(servicesDir)) return null;

  try {
    const items = fs.readdirSync(servicesDir);
    // Sort descending to search newer PHP versions first
    const phpDirs = items
      .filter(item => item.startsWith('php-'))
      .sort((a, b) => b.localeCompare(a));

    for (const phpDir of phpDirs) {
      const win64Path = path.join(servicesDir, phpDir, 'bin', 'win64');
      if (fs.existsSync(path.join(win64Path, 'php.exe'))) {
        return win64Path;
      }
      const win32Path = path.join(servicesDir, phpDir, 'bin', 'win32');
      if (fs.existsSync(path.join(win32Path, 'php.exe'))) {
        return win32Path;
      }
    }
  } catch (err) {
    // Ignore read errors
  }
  return null;
}

let phpAvailable = false;
let tempIniDir = null;

try {
  // Check if php is already available in the current PATH and has mbstring
  try {
    const modules = execSync('php -m', { stdio: 'pipe' }).toString();
    if (modules.includes('mbstring')) {
      phpAvailable = true;
    }
  } catch (e) {
    // If php is not available or doesn't have mbstring, check if we can locate Flywheel PHP
    const flywheelPhpDir = locateFlywheelPhp();
    if (flywheelPhpDir) {
      // Create temporary php.ini with necessary extensions loaded
      tempIniDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wp-php-ini-'));
      const extDir = path.join(flywheelPhpDir, 'ext').replace(/\\/g, '/');
      const iniContent = `[PHP]\nextension_dir = "${extDir}"\nextension = openssl\nextension = curl\nextension = mbstring\n`;
      fs.writeFileSync(path.join(tempIniDir, 'php.ini'), iniContent);

      // Expose to environment
      process.env.PHPRC = tempIniDir;
      process.env.PATH = `${process.env.PATH};${flywheelPhpDir}`;

      // Check if it works now
      const modules = execSync('php -m', { stdio: 'pipe' }).toString();
      if (modules.includes('mbstring')) {
        phpAvailable = true;
        console.log(`📌 Found PHP at Local by Flywheel: ${flywheelPhpDir}`);
        console.log('📌 Dynamically enabled mbstring extension using temporary php.ini');
      }
    }
  }

  if (!phpAvailable) {
    console.warn('\n⚠️  WARNING: "php" command (with "mbstring" extension) not found on this system.');
    console.warn('Skipping WordPress i18n localization translation files generation.');
    console.warn('The build and zip packaging will continue without translations.\n');
    process.exit(0);
  }

  console.log('Generating translation files...');
  execSync('npm run i18n-pot', { shell: true, stdio: 'inherit' });
  execSync('npm run i18n-json', { shell: true, stdio: 'inherit' });
  execSync('npm run i18n-mo', { shell: true, stdio: 'inherit' });

} catch (error) {
  console.error('Error during translation file generation:', error.message);
  process.exit(0);
} finally {
  // Clean up the temporary ini directory
  if (tempIniDir && fs.existsSync(tempIniDir)) {
    try {
      fs.rmSync(tempIniDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup error
    }
  }
}
