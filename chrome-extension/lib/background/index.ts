/* eslint-disable no-console */
import 'webextension-polyfill';

import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { initializeTabs } from '@root/utils/tabs';

async function demo(): Promise<void> {
  try {
    const theme = await exampleThemeStorage.get();
    console.log('theme', theme);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log('all the tabs, yay!: ', await initializeTabs());
  } catch (error) {
    console.error('Error running demo: ', error);
  }
}

void demo();

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");
