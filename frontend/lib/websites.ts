import fs from 'fs/promises';
import path from 'path';

export interface CompatibleDownloader {
  name: string;
  link: string;
}

export interface WebsiteSummary {
  name: string;
  categories: string[];
  searchUrl?: string;
  searchMethod?: string;
  spaceReplacement?: string;
  loginRequired: boolean;
  loginUrl?: string;
  homepage?: string;
  xxx?: boolean;
  compatibleDownloaders: CompatibleDownloader[];
  searchableText: string;
}

export interface DirectoryData {
  websites: WebsiteSummary[];
  categories: string[];
  downloaders: CompatibleDownloader[];
}

interface RawConfig {
  name?: string;
  categories?: string[];
  search?: {
    url?: string;
    method?: string;
    spaceReplacement?: string;
  };
  login?: {
    url?: string;
  };
  compatibleDownloaders?: string[];
  xxx?: boolean;
}

export async function loadDirectoryData(): Promise<DirectoryData> {
  const cwd = process.cwd();
  const assetCandidates = [
    path.join(cwd, 'assets'),
    path.join(cwd, '..', 'assets'),
  ];

  let assetsDir: string | undefined;
  for (const candidate of assetCandidates) {
    try {
      await fs.access(candidate);
      assetsDir = candidate;
      break;
    } catch (error) {
      // keep looking
    }
  }

  if (!assetsDir) {
    throw new Error('Unable to locate the assets directory with website configurations.');
  }

  const configDir = path.join(assetsDir, 'website_configs');
  const configFiles = await fs.readdir(configDir);
  const downloaders: CompatibleDownloader[] = JSON.parse(
    await fs.readFile(path.join(assetsDir, 'compatible_downloaders.json'), 'utf-8'),
  );
  const downloaderMap = new Map(downloaders.map((d) => [d.name, d]));

  const websites: WebsiteSummary[] = [];
  const categorySet = new Set<string>();

  for (const file of configFiles) {
    if (!file.endsWith('.json')) continue;
    const raw: RawConfig = JSON.parse(
      await fs.readFile(path.join(configDir, file), 'utf-8'),
    );
    if (!raw.name) continue;

    const categories = raw.categories ?? [];
    categories.forEach((category) => categorySet.add(category));

    const searchUrl = raw.search?.url;
    let homepage: string | undefined;
    if (searchUrl) {
      try {
        const url = new URL(searchUrl);
        homepage = url.origin;
      } catch (error) {
        // ignore invalid URLs; homepage will remain undefined
      }
    }

    const compatibleDownloaders = (raw.compatibleDownloaders ?? [])
      .map((name) => downloaderMap.get(name))
      .filter((value): value is CompatibleDownloader => Boolean(value));

    const searchableText = [raw.name, ...(categories ?? []), homepage]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const summary: WebsiteSummary = {
      name: raw.name,
      categories,
      loginRequired: Boolean(raw.login?.url),
      compatibleDownloaders,
      searchableText,
    };

    if (searchUrl) {
      summary.searchUrl = searchUrl;
    }

    if (raw.search?.method) {
      summary.searchMethod = raw.search.method;
    }

    if (raw.search?.spaceReplacement) {
      summary.spaceReplacement = raw.search.spaceReplacement;
    }

    if (raw.login?.url) {
      summary.loginUrl = raw.login.url;
    }

    if (homepage) {
      summary.homepage = homepage;
    }

    if (typeof raw.xxx !== 'undefined') {
      summary.xxx = raw.xxx;
    }

    websites.push(summary);
  }

  websites.sort((a, b) => a.name.localeCompare(b.name));
  const categories = Array.from(categorySet).sort((a, b) => a.localeCompare(b));

  return { websites, categories, downloaders };
}
