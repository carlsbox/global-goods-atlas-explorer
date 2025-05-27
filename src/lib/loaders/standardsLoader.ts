
export async function loadStandardsData() {
  try {
    const module = await import('../../data/standards/standards.json');
    return module.default;
  } catch (error) {
    console.error('Failed to load standards data:', error);
    return [];
  }
}
