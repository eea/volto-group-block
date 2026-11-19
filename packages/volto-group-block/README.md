# @eeacms/volto-group-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-group-block)](https://github.com/eea/volto-group-block/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-group-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-group-block/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block)

[Volto](https://github.com/plone/volto) add-on to group blocks in sections and filter available blocks per content-type per section

## Features

![Group blocks and restrict available blocks](https://raw.githubusercontent.com/eea/volto-group-block/master/docs/volto-group-block.gif)

## Upgrade

### Upgrading to 11.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The block keeps the same API, so upgrading from 10.x on Volto 18 needs no code changes. The release adds Volto 19 support and moves the repository to the Volto 19 layout, where the published package lives in `packages/volto-group-block`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 10.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 10.x declared no peers.
- **`uuid` is no longer a runtime dependency.** The sources never imported it; only the tests did.

### Upgrading to 10.x

> This version requires `Volto >= 17.18` or `Volto 18+`. It removes the custom `EditBlockWrapper` and uses Volto's built-in block chrome provided by `BlocksForm`.

#### Breaking changes

- **Removed `EditBlockWrapper.jsx`.** Any code importing `EditBlockWrapper` from `@eeacms/volto-group-block` will break. Use Volto's built-in `EditBlockWrapper` from `@plone/volto/components/manage/Blocks/Block/EditBlockWrapper` if you need a custom wrapper.
- **Removed the "Section help" button.** The `?` icon that appeared in the inner block toolbar and opened the sidebar to display editing instructions has been removed. The `instructions` field is still available in the group block schema and still rendered in the sidebar panel, but there is no longer a per-block shortcut button to reveal it.
- **`disableInnerButtons`** is now implemented via a CSS class (`.disable-inner-buttons`) instead of a JS-level `disabled` prop on the removed wrapper.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-group-block": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-group-block'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
