// ==UserScript==
// @name         MusicBrainz external urls icons
// @author       miau4+chatgpt (vibecoded cause im dumbass)
// @namespace    https://github.com/DinoRTX
// @version      1.0
// @tag          ai-created
// @downloadURL  https://github.com/DinoRTX/musicbrainz-userscripts/blob/main/mb-url-icons.user.js
// @updateURL    https://github.com/DinoRTX/musicbrainz-userscripts/blob/main/mb-url-icons.user.js
// @supportURL   https://github.com/DinoRTX/musicbrainz-userscripts/issues
// @icon         https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/refs/heads/main/icon.png
// @license      GNU GPL3
// @match        https://musicbrainz.org/*
// @description  changes url to have a icon on musicbrainz.org NOTE this userscripts is designed for dark mode
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ICON = (name, color) =>
        `https://cdn.simpleicons.org/${name}/${color}`;

    const ICONS = {
        spotify: ICON("spotify", "1DB954"),
        apple: ICON("applemusic", "FA243C"),
        bandcamp: ICON("bandcamp", "629AA9"),
        soundcloud: ICON("soundcloud", "FF5500"),
        youtube: ICON("youtube", "FF0000"),
        tidal: ICON("tidal", "FFFFFF"),
        qobuz: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/refs/heads/main/qobuz.png",
        beatport: ICON("beatport", "01FF95"),
        discogs: ICON("discogs", "FFFFFF"),
        deezer: ICON("deezer", "A238FF"),
        vocadb: "https://static.vocadb.net/img/favicon.ico",
        touhoudb: "https://static.touhoudb.com/img/favicon.ico",
        utaitedb: "https://static.utaitedb.net/img/favicon.ico",
        boomplay: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/4722f0fa6048393abdb3cd47d16e5e4e8b270ee8/boomplay.svg",
        thwiki: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/refs/heads/main/thwiki.png",
        creativecommons: ICON("creativecommons", "FFFFFF"),
        amazon: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/4722f0fa6048393abdb3cd47d16e5e4e8b270ee8/amazon.svg",
        amazonmusic: "https://upload.wikimedia.org/wikipedia/commons/9/92/Amazon_Music_logo.svg",
        revealed: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/c6edc6692e5118a84633f419ee1d4bd70465ce25/revealed.svg",
        audiomack: ICON("audiomack", "FFA200"),
        hdtracks: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/4722f0fa6048393abdb3cd47d16e5e4e8b270ee8/hdtracks.svg",
        dropbox: ICON("dropbox", "0061FF"),
        lastfm: ICON("lastdotfm", "D51007"),
        wikidata: ICON("wikidata", "006699"),
        allmusic: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/refs/heads/main/allmusic.png",
        rateyourmusic: "https://raw.githubusercontent.com/DinoRTX/musicbrainz-userscripts/4722f0fa6048393abdb3cd47d16e5e4e8b270ee8/rateyourmusic.svg",
        genius: ICON("genius", "FFFF64"),
        itunes: ICON("itunes", "FB5BC5")
    };

    function getService(host) {
        host = host.replace(/^www\./, "");

        if (host.includes("spotify")) return "spotify";
        if (host.includes("music.apple")) return "apple";
        if (host.includes("bandcamp")) return "bandcamp";
        if (host.includes("soundcloud")) return "soundcloud";
        if (host.includes("youtube")) return "youtube";
        if (host.includes("tidal")) return "tidal";
        if (host.includes("qobuz")) return "qobuz";
        if (host.includes("beatport")) return "beatport";
        if (host.includes("discogs")) return "discogs";
        if (host.includes("deezer")) return "deezer";
        if (host.includes("vocadb.net")) return "vocadb";
        if (host.includes("touhoudb")) return "touhoudb";
        if (host.includes("utaitedb.net")) return "utaitedb";
        if (host.includes("boomplay")) return "boomplay";
        if (host.includes("thwiki.cc")) return "thwiki";
        if (host.includes("creativecommons.org")) return "creativecommons";
        if (host.includes("amazon")) return "amazon";
        if (host.includes("music.amazon")) return "amazonmusic";
        if (host.includes("revealedrecordings")) return "revealed";
        if (host.includes("audiomack")) return "audiomack";
        if (host.includes("hdtracks")) return "hdtracks";
        if (host.includes("dropbox")) return "dropbox";
        if (host.includes("last.fm")) return "lastfm";
        if (host.includes("wikidata.org")) return "wikidata";
        if (host.includes("allmusic")) return "allmusic";
        if (host.includes("rateyourmusic")) return "rateyourmusic";
        if (host.includes("genius")) return "genius";
        if (host.includes("itunes.apple")) return "itunes";


        return null;
    }

    function process() {

        document.querySelectorAll("#bottom-credits a[href], .annotation-body a[href]").forEach(a => {

            if (a.dataset.done) return;
            a.dataset.done = "1";

            let url;
            try {
                url = new URL(a.href, location.origin);
            } catch {
                return;
            }

            const host = url.hostname.replace(/^www\./, "");
            const service = getService(host);

            if (!service) return;

            const path = url.pathname + url.search + url.hash;

            // bandcamp
            if (service === "bandcamp") {
                const sub = url.hostname.split(".")[0];

                a.innerHTML = `
                    <span>${sub}</span>
                    <img src="${ICONS.bandcamp}" style="width:14px;height:14px;vertical-align:middle;">
                    ${path}
                `;

                return;
            }

            a.innerHTML = `
                <img src="${ICONS[service]}"
                     style="width:16px;height:16px;
                            vertical-align:middle;
                            margin-right:4px;">
                <span>${path}</span>
            `;
        });
    }

    // 🔧 Spacing
    const style = document.createElement("style");
    style.textContent = `
        #bottom-credits a.wrap-anywhere img {
            display: inline-block;
            vertical-align: middle;
        }

        #bottom-credits a.wrap-anywhere {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
    `;
    document.head.appendChild(style);

    process();

    new MutationObserver(process).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
