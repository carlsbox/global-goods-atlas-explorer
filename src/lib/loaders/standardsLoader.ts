
export async function loadStandardsData() {
  try {
    const module = await import('../../i18n/locales/en/standard.json');
    return module.default;
  } catch (error) {
    console.error('Failed to load standards data:', error);
    return [];
  }
}
