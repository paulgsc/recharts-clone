export type Manifest = chrome.runtime.ManifestV3;

export type ManifestParserInterface = {
  convertManifestToString: (manifest: Manifest, env: 'chrome' | 'firefox') => string;
};
