/* eslint-disable no-console */
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleTheme(): Promise<void> {
  console.log('initial theme:', await exampleThemeStorage.get());
  await exampleThemeStorage.toggle();
  console.log('toggled theme:', await exampleThemeStorage.get());
}
