# Mutti Web

The shared interface for the Mutti Mac app and Docker/NAS server, derived from
[Jellyfin Web](https://github.com/jellyfin/jellyfin-web) **v12.1**.

Development preview: local setup and the kurtz design language. Secure QR
enrollment and direct remote connectivity are not available yet. No relay is shipped.

```sh
npm ci
npm run build:production
npm run build:check
```

See [Mutti](https://github.com/ralleur/mutti) for packaging, the implementation
plan, and release gates. Mutti changes live on `codex/mutti-foundation` until review.
The upstream project and contributors remain credited in [UPSTREAM.md](UPSTREAM.md).
Jellyfin API names and version compatibility are retained. GPL-2.0-or-later;
see [LICENSE](LICENSE). Sora is distributed under the included SIL OFL.
