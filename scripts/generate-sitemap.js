import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for the site
const BASE_URL = 'https://beta.globalgoodsguidebook.org';

// Define static routes with their priority and change frequency
const staticRoutes = [
  { path: '/', priority: 1.0, changeFreq: 'daily' },
  { path: '/global-goods', priority: 0.9, changeFreq: 'daily' },
  { path: '/use-cases', priority: 0.8, changeFreq: 'weekly' },
  { path: '/map', priority: 0.7, changeFreq: 'weekly' },
  { path: '/climate-health', priority: 0.7, changeFreq: 'weekly' },
  { path: '/reference', priority: 0.6, changeFreq: 'monthly' },
  { path: '/about', priority: 0.5, changeFreq: 'monthly' },
  { path: '/create-global-good', priority: 0.4, changeFreq: 'monthly' }
];

// Function to generate XML for a URL entry
function generateUrlEntry(url, priority = 0.5, changeFreq = 'weekly', lastMod = new Date().toISOString().split('T')[0]) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Function to generate the complete sitemap
async function generateSitemap() {
  console.log('Generating sitemap...');
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  // Add static routes
  for (const route of staticRoutes) {
    sitemap += generateUrlEntry(
      `${BASE_URL}${route.path}`,
      route.priority,
      route.changeFreq
    );
  }

  // Load global goods data to generate dynamic routes
  try {
    const indexPath = path.join(__dirname, '..', 'public', 'data', 'global-goods', 'index.json');
    const globalGoodsData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    
    // Add individual global good pages
    for (const good of globalGoodsData) {
      if (good.ID) {
        sitemap += generateUrlEntry(
          `${BASE_URL}/global-goods/${good.ID}`,
          0.6,
          'weekly'
        );
      }
    }
    
    console.log(`Added ${globalGoodsData.length} global goods to sitemap`);
  } catch (error) {
    console.error('Error loading global goods data:', error);
  }

  // Load use cases data
  try {
    const useCasesDir = path.join(__dirname, '..', 'src', 'data', 'use-cases');
    const useCaseFiles = fs.readdirSync(useCasesDir).filter(file => file.endsWith('.json'));
    
    for (const file of useCaseFiles) {
      const id = file.replace('.json', '');
      sitemap += generateUrlEntry(
        `${BASE_URL}/use-cases/${id}`,
        0.5,
        'monthly'
      );
    }
    
    console.log(`Added ${useCaseFiles.length} use cases to sitemap`);
  } catch (error) {
    console.error('Error loading use cases:', error);
  }

  // Close the sitemap
  sitemap += `
</urlset>`;

  // Write the sitemap to public directory
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
  
  // Also generate robots.txt if it doesn't have sitemap reference
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  
  if (!robotsContent.includes('Sitemap:')) {
    const updatedRobots = robotsContent.trim() + `\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
    fs.writeFileSync(robotsPath, updatedRobots);
    console.log('Updated robots.txt with sitemap reference');
  }
}

// Run the generator
generateSitemap().catch(console.error);