import type { Tab } from '../../types/tabs';

export const initializeTabs = async (): Promise<Tab[]> => {
  try {
    return (await chrome.tabs.query({ url: '<all_urls>' })) satisfies Tab[];
  } catch (_) {
    return [] satisfies Tab[];
  }
};
