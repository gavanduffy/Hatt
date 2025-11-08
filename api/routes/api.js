import express from 'express';
import { loadWebsiteConfigs, getWebsitesByCategories, getWebsitesWithLogin } from '../config/websites.js';
import { searchWebsites } from '../scrapers/scraper.js';

const router = express.Router();

// Cache for website configs
let websiteConfigs = null;

// Load configs on first request
async function getConfigs() {
  if (!websiteConfigs) {
    websiteConfigs = await loadWebsiteConfigs();
  }
  return websiteConfigs;
}

// Get websites by categories
router.post('/websites/by-categories', async (req, res) => {
  try {
    const { categories } = req.body;
    const configs = await getConfigs();
    const websites = getWebsitesByCategories(configs, categories || ['all']);
    res.json(websites);
  } catch (error) {
    console.error('Error getting websites:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get websites that require login
router.get('/websites/with-login', async (req, res) => {
  try {
    const configs = await getConfigs();
    const websites = getWebsitesWithLogin(configs);
    res.json(websites);
  } catch (error) {
    console.error('Error getting websites with login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search endpoint
router.post('/search', async (req, res) => {
  try {
    const { query, websites, categories } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    if (!websites || websites.length === 0) {
      return res.status(400).json({ error: 'At least one website must be selected' });
    }

    const configs = await getConfigs();
    const results = await searchWebsites(query, websites, configs, categories || []);
    
    res.json(results);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
