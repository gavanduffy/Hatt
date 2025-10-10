# <img width="50px" style="margin-bottom:-12px;" src="./frontend/public/icons/icon.svg" alt="Hatt"></img> Hatt

Hatt is now available as a progressive web application that runs directly in the browser. It keeps the original spirit of the project—helping you find the best sources for direct downloads and streaming—while delivering a fast, modern interface that works great on desktop and mobile. Deploy it to [Vercel](https://vercel.com/) or self-host it anywhere that supports static Next.js builds and enjoy the directory offline thanks to PWA capabilities.

<p align="center">
  <img src="https://img.shields.io/github/downloads/FrenchGithubUser/Hatt/total" alt="Downloads"/>
  <img src="https://img.shields.io/badge/Coded%20By%20Human-100%25-brightgreen"/>
</p>
<p align="center">
  <a href="https://discord.gg/88NbZrwmZk" target="_blank"><img height="30px" alt="Discord" src="https://img.shields.io/discord/1088442023582904390?label=Discord&logo=discord"></a>
  <a href="https://www.reddit.com/r/Hatt/" target="_blank"><img height="30px" alt="Subreddit subscribers" src="https://img.shields.io/reddit/subreddit-subscribers/hatt?label=Reddit&style=social"></a>
</p>

![Hatt Directory preview](.meta/home.jpg)

If you have suggestions (new features, new sources etc.), find a bug or want to notify about something, do not hesitate to open an issue.

If a source is broken, down or should not be trusted anymore, please open an issue about it !

<details> <summary> <b> Supported sources </b> </summary>

 * 9anime
 * androeed
 * animekaizoku
 * animepahe
 * animetosho
 * apkmb
 * audiobb
 * audiobookbay
 * audiobooksbee
 * audiobookslab
 * audiobookss
 * bigaudiobooks
 * bilibili
 * comicextra
 * coomer
 * ddlbase
 * diakov
 * dodi-repacks
 * dosgamesarchive
 * ebook-hunter
 * edgeemu
 * emugames
 * f2movies
 * fapachi
 * fapello
 * fapeza
 * filecr
 * fitgirl-repacks
 * forcoder
 * free-mp3-download
 * g4u
 * galaxyaudiobook
 * game-2u
 * gamedrive
 * getcomics
 * gload
 * gog-games
 * gogoanime
 * goldenaudiobook
 * gomovies
 * hdaudiobooks
 * himovies
 * hotaudiobooks
 * hotleak
 * kayoanime
 * kemono
 * kupdf
 * libgenli
 * library genesis (.rs)
 * lrepack
 * magazinerack
 * memoryoftheworld
 * mobilism
 * nesgm
 * nsw2u
 * online-courses
 * openloadmov
 * ovagames
 * pdfdrive
 * rarefilmm
 * readcomicsonline
 * repackme
 * revdl
 * romulation
 * sflix
 * slavart
 * softarchive
 * steamrip
 * tokybook
 * trantor
 * udemy24
 * uhdmovies
 * vimm
 * watchcartoonsonline
 * wawacity
 * xoxocomics
 * yourserie
 * youtube
 * zoro

</details>

## Features

- Curated directory of direct-download and streaming sources grouped by category
- Instant search and filtering with per-category toggles
- Local favourites so you can pin the websites you return to the most
- Optional filters to hide login-only or adult websites
- Responsive design with automatic light/dark themes
- Installable PWA that works offline on mobile browsers
- Ready-to-deploy static build for Vercel or any Next.js-compatible host

## Installation

Here are the different ways you can get Hatt :

### Linux

- From the [releases tab](https://github.com/FrenchGithubUser/Hatt/releases)

- AUR : [hatt-bin](https://aur.archlinux.org/packages/hatt-bin)


### Windows

- From the [releases tab](https://github.com/FrenchGithubUser/Hatt/releases)


### MacOS

- From the [releases tab](https://github.com/FrenchGithubUser/Hatt/releases) (works on M1 chip). Not always available for the latest release as it requires apple hardware, which I don't personally have.

- Build from source

- Install linux


## Build the web app locally

The web client lives in the `frontend/` folder and is built with Next.js.

```
cd frontend
npm install
npm run dev
```

To create a production build (the same output Vercel will serve):

```
npm run build
npm start
```

The generated static assets are ready to deploy on Vercel or any static host. See CONTRIBUTING.md for more details

## Not Goals (to this day)

- All-in-one tool to download/stream media and display it nicely at the same time. Many softwares already do that very well ([Kodi](https://github.com/xbmc/xbmc) for movies/TV shows, [Pegasus-fe](https://github.com/mmatyas/pegasus-frontend) for games and programs, just to name a few)

- Easy "download" option. Some programs already allow to download files very well ([JDownloader](https://jdownloader.org/), [Youtube-dl](https://github.com/ytdl-org/youtube-dl), [Lux](https://github.com/iawia002/lux), just to name a few). There might be an implementation of such a feature by adding those programs as dependencies to Hatt later.


## FAQ

<details> <summary> Why a web version now? </summary>

The original Hatt desktop client relied on the Wails framework and executed scraping logic locally. Thanks to community feedback we now offer a lightweight web-first experience that runs entirely in the browser and can be hosted on services such as Vercel. The scraping configurations remain open-source so power users can still build native binaries if desired, but the new PWA provides instant access without downloads.

</details>

<details> <summary> Is there a mobile version ? </summary>

Yes! Install the PWA from your browser's share menu ("Add to Home Screen" on iOS/Android) to enjoy an app-like experience with offline support.

</details>

## Support

If you like Hatt, you can donate to support its development here :
<details> <summary> <b> Cryptocurrency </b> </summary>

Monero : 46NLLW7dzu5jo2eZ3SiAKgQuVL1Jw8wPMSBAYA3eh4h334HzwMNFSXQ3V3PmXYEoMFXkt24pTHcD1X57KRePN8ehQXn3Ggt

Bitcoin : bc1qf4a44ae76txhmfxfsa875u8mv6murdwawt7msx

Ethereum : 0x134a0974f2fefF0F76276fBdD44439717B2b587B

</details>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W7JUGNI)

## Disclaimer

All the sources linked in this tool are not intended to support copyright infringement. I am not responsible for and in no way associated to any external links or their content linked, all the links available through this tool are publicly available over the internet. I have no control over the nature, content and availability of other websites. If you dislike the information this tool provides then please contact the corresponding website's owner/webmaster/hoster directly and fill a DMCA takedown request.
