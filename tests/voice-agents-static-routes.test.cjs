const assert = require('assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

execFileSync(process.execPath, [path.join(projectRoot, 'scripts', 'copy-voice-agents.cjs')], {
  cwd: projectRoot,
  stdio: 'inherit',
});

const voiceAgentsRoot = path.join(projectRoot, 'dist', 'voice-agents');
const sourceHtml = path.join(voiceAgentsRoot, 'index.html');

for (const route of ['wie-funktioniert-es', 'kosten', 'ueber-uns', 'demo-buchen']) {
  const routeHtml = path.join(voiceAgentsRoot, route, 'index.html');
  assert.ok(fs.existsSync(routeHtml), `Expected static route file for /voice-agents/${route}`);
  assert.strictEqual(
    fs.readFileSync(routeHtml, 'utf8'),
    fs.readFileSync(sourceHtml, 'utf8'),
    `Expected /voice-agents/${route} to serve the voice agents landing page`,
  );
}
