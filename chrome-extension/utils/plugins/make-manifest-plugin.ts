import { colorLog, ManifestParser } from '@chrome-extension-boilerplate/dev-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { pathToFileURL } from 'url';
import type { PluginOption } from 'vite';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { resolve } = path;

const rootDir = resolve(__dirname, '..', '..');
const manifestFile = resolve(rootDir, 'manifest.js');

const getManifestWithCacheBurst = (): Promise<{ default: chrome.runtime.ManifestV3 }> => {
  const withCacheBurst = (path: string): string => `${path}?${Date.now().toString()}`;
  /**
   * In Windows, import() doesn't work without file:// protocol.
   * So, we need to convert path to file:// protocol. (url.pathToFileURL)
   */
  if (process.platform === 'win32') {
    return import(withCacheBurst(pathToFileURL(manifestFile).href)) as Promise<{
      default: chrome.runtime.ManifestV3;
    }>;
  }
  return import(withCacheBurst(manifestFile)) as Promise<{
    default: chrome.runtime.ManifestV3;
  }>;
};

export default function makeManifestPlugin(config: { outDir: string }): PluginOption {
  function makeManifest(manifest: chrome.runtime.ManifestV3, to: string): void {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, 'manifest.json');

    const isFirefox = process.env['__FIREFOX__'];
    fs.writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, isFirefox ? 'firefox' : 'chrome'));

    colorLog(`Manifest file copy complete: ${manifestPath}`, 'success');
  }

  return {
    name: 'make-manifest',
    buildStart(): void {
      this.addWatchFile(manifestFile);
    },
    async writeBundle(): Promise<void> {
      const outDir = config.outDir;
      const manifest = await getManifestWithCacheBurst();
      makeManifest(manifest.default, outDir);
    },
  };
}
