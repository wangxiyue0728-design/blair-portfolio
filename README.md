# Blair Wang portfolio — recovered frontend and local backend

This is an independent working copy under development. The original browser application bundle preserves the original React frontend, styling, routes, animations and admin UI. It is compiled JavaScript, not the original JSX source tree. The backend was recreated and has not been verified end to end.

## Start on your Mac

Run in this folder:

    python3 server.py

Open http://127.0.0.1:4173 for the portfolio and http://127.0.0.1:4173/local-editor for the editor. The editor entrance is intended only for a local server bound to 127.0.0.1. Do not expose this server publicly.

Edits persist in local-data.json; uploaded files persist in dist/uploads. Keep these when making backups. A clean checkout starts from the committed initial-data.json. Keep initial-data.json and public-data.json in sync when promoting portfolio edits. The initial snapshot must have an empty messages list.

## Implemented replacement API

Settings, project creation/update/deletion, media uploads, project retrieval, contact message submission and inbox retrieval/deletion. Local editor authentication uses a fresh session token on each server startup.

## Remaining work

- End-to-end browser verification and visual comparison. Starting the local HTTP server was denied by the current execution sandbox.
- AI writing helper: its existing controls remain, but requests return an explicit unavailable response until an independent provider is connected.
- Public hosting: use a production backend with proper admin authentication, persistent storage, upload controls and contact-form abuse protection. This package is local-only at present.
- Reconstruct original source files if desired; the recovered bundle is editable JavaScript but is less convenient than JSX.

The original Emergent API origin was replaced with the local origin. The webpack development live-reload entrypoints were removed. Emergent's overlay and analytics scripts are not included in this application's HTML.
