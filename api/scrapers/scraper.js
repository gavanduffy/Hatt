import axios from 'axios';
import * as cheerio from 'cheerio';

// Scrape using plain HTML parsing (equivalent to ScrapePlainHtml from Go)
export async function scrapePlainHtml(config, userInput, selectedCategories = []) {
  const items = [];
  const itemKeys = config.search?.itemKeys;
  
  if (!itemKeys || !config.search?.url) {
    return items;
  }

  try {
    // Encode query based on encoding type
    const encodeQuery = (input) => {
      if (config.search.encoding === 'hyphen') {
        return input.replace(/ /g, '-');
      }
      return encodeURIComponent(input);
    };

    const encodedInput = encodeQuery(userInput);
    let url = config.search.url + encodedInput;

    // Handle category-specific attributes
    if (config.search.categorySpecificAttributes?.name) {
      const categoryValues = config.search.categorySpecificAttributes.values;
      const categories = selectedCategories.length > 0 ? selectedCategories : Object.keys(categoryValues);
      
      // For now, just use the first matching category
      for (const category of categories) {
        if (categoryValues[category]) {
          url += `&${config.search.categorySpecificAttributes.name}=${categoryValues[category]}`;
          break;
        }
      }
    }

    // Make HTTP request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/109.0',
      'Accept-Language': 'en'
    };

    let response;
    if (config.search.method === 'POST') {
      const formData = { ...config.search.postFields?.generic || {} };
      formData[config.search.postFields?.input || 'q'] = encodedInput;
      response = await axios.post(config.search.url, formData, { headers, timeout: 30000 });
    } else {
      response = await axios.get(url, { headers, timeout: 30000 });
    }

    // Parse HTML with cheerio
    const $ = cheerio.load(response.data);
    const baseUrl = new URL(config.search.url).origin;

    // Extract items
    $(itemKeys.root).each((i, element) => {
      const $el = $(element);
      
      // Get name
      const name = $el.find(itemKeys.name).text().trim() || $el.text().trim();
      
      if (!name) return;

      // Get link
      let link = '';
      if (itemKeys.link === 'root') {
        link = $el.attr('href') || '';
      } else {
        link = $el.find(itemKeys.link).attr('href') || '';
      }
      
      // Make link absolute
      if (link && !link.startsWith('http')) {
        link = new URL(link, baseUrl).href;
      }

      // Get thumbnail
      let thumbnail = '';
      if (itemKeys.thumbnail && !itemKeys.thumbnail.onItemPage) {
        if (itemKeys.thumbnail.key === 'root') {
          thumbnail = $el.attr(itemKeys.thumbnail.attribute) || '';
        } else {
          thumbnail = $el.find(itemKeys.thumbnail.key).attr(itemKeys.thumbnail.attribute) || '';
        }
        
        // Handle style attribute for background images
        if (itemKeys.thumbnail.attribute === 'style' && thumbnail) {
          const urlMatch = thumbnail.match(/url\(([^)]+)\)/);
          if (urlMatch) thumbnail = urlMatch[1];
        }
        
        // Make thumbnail absolute if needed
        if (thumbnail && itemKeys.thumbnail.appendToSiteUrl && !thumbnail.startsWith('http')) {
          thumbnail = new URL(thumbnail, baseUrl).href;
        }
      }

      // Get metadata
      const metadata = {};
      if (itemKeys.metadata) {
        for (const [key, selector] of Object.entries(itemKeys.metadata)) {
          const value = $el.find(selector).text().trim();
          if (value) {
            metadata[key] = value;
          }
        }
      }

      items.push({
        name,
        link,
        thumbnail,
        metadata
      });
    });

  } catch (error) {
    console.error(`Error scraping ${config.name}:`, error.message);
  }

  return items;
}

// Search across multiple websites
export async function searchWebsites(userInput, websites, configs, selectedCategories = []) {
  const results = [];
  
  // Process websites in parallel
  const promises = websites.map(async (websiteName) => {
    const config = configs[websiteName];
    
    if (!config) {
      console.warn(`Config not found for: ${websiteName}`);
      return null;
    }

    try {
      // For now, we only support plain HTML scraping
      // Specific scrapers and JS rendering would need separate implementation
      let items = [];
      
      if (!config.specificScraper) {
        items = await scrapePlainHtml(config, userInput, selectedCategories);
      } else {
        console.warn(`Specific scraper not implemented for: ${websiteName}`);
      }

      return {
        website: config.name,
        items,
        compatibleDownloaders: config.compatibleDownloaders || []
      };
    } catch (error) {
      console.error(`Error processing ${websiteName}:`, error.message);
      return {
        website: websiteName,
        items: [],
        error: error.message
      };
    }
  });

  const settledResults = await Promise.allSettled(promises);
  
  for (const result of settledResults) {
    if (result.status === 'fulfilled' && result.value) {
      results.push(result.value);
    }
  }

  return results;
}
