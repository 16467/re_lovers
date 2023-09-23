/*
 * SPDX-FileCopyrightText: syuilo and other misskey, cherrypick contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const { execSync } = require('child_process');
const fs = require('fs');

(async () => {
	fs.rmSync(__dirname + '/../packages/backend/built', { recursive: true, force: true });
	fs.rmSync(__dirname + '/../packages/backend/node_modules', { recursive: true, force: true });

	fs.rmSync(__dirname + '/../packages/frontend/built', { recursive: true, force: true });
	fs.rmSync(__dirname + '/../packages/frontend/node_modules', { recursive: true, force: true });

	fs.rmSync(__dirname + '/../packages/sw/built', { recursive: true, force: true });
	fs.rmSync(__dirname + '/../packages/sw/node_modules', { recursive: true, force: true });

	fs.rmSync(__dirname + '/../packages/megalodon/lib', { recursive: true, force: true });

	fs.rmSync(__dirname + '/../built', { recursive: true, force: true });
	fs.rmSync(__dirname + '/../node_modules', { recursive: true, force: true });

	execSync('pnpm store prune', {
		cwd: __dirname + '/../',
		stdio: 'inherit',
	});
})();
