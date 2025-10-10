import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load all website configurations
export async function loadWebsiteConfigs() {
  const configsPath = join(__dirname, '../../assets/website_configs');
  const files = await readdir(configsPath);
  const configs = {};
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await readFile(join(configsPath, file), 'utf-8');
      const config = JSON.parse(content);
      const name = file.replace('.json', '');
      configs[name] = config;
    }
  }
  
  return configs;
}

// Get websites by categories
export function getWebsitesByCategories(configs, selectedCategories) {
  const websites = [];
  
  for (const [name, config] of Object.entries(configs)) {
    for (const category of selectedCategories) {
      if (config.categories?.includes(category) || category === 'all') {
        websites.push(name);
        break;
      }
    }
  }
  
  return websites;
}

// Get websites that require login
export function getWebsitesWithLogin(configs) {
  const websites = [];
  
  for (const [name, config] of Object.entries(configs)) {
    if (config.login?.url) {
      websites.push({
        name: name,
        fields: config.login.fields || []
      });
    }
  }
  
  return websites;
}
