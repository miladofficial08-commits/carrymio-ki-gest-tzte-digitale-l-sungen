const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const src = path.join(projectRoot, 'tawano-voiceagents-main', 'tawano-voiceagents-main');
const dest = path.join(projectRoot, 'dist', 'voice-agents');
const staleRootConfig = path.join(projectRoot, 'dist', 'netlify.toml');

async function copyDir(srcDir, destDir) {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const real = await fs.promises.readlink(srcPath);
      await fs.promises.symlink(real, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    if (fs.existsSync(staleRootConfig)) {
      await fs.promises.rm(staleRootConfig, { force: true });
      console.log('removed stale publish config', staleRootConfig);
    }

    if (!fs.existsSync(src)) {
      console.log('Source not found, skipping voice-agents copy:', src);
      process.exit(0);
    }
    // remove existing dest if present
    try { await fs.promises.rm(dest, { recursive: true, force: true }); } catch (e) {}
    await copyDir(src, dest);
    console.log('voice-agents copied to', dest);
  } catch (err) {
    console.error('Failed to copy voice-agents:', err);
    process.exit(1);
  }
})();
