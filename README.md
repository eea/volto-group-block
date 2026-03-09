# volto-group-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-group-block)](https://github.com/eea/volto-group-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-group-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-group-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-group-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-group-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-group-block&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-group-block&branch=develop)

[Volto](https://github.com/plone/volto) add-on to group blocks in sections and filter available blocks per content-type per section

## Features

![Group blocks and restrict available blocks](https://raw.githubusercontent.com/eea/volto-group-block/master/docs/volto-group-block.gif)

## Getting started

### Try volto-group-block with Docker

      git clone https://github.com/eea/volto-group-block.gits
      cd volto-group-block
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use `make VOLTO_VERSION=17 start`.

### Add volto-group-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-group-block"
   ],

   "dependencies": {
       "@eeacms/volto-group-block": "*"
   }
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

   `@plone/volto-generator` is deprecated in Volto 18 and should not be used for new projects.

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-group-block/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-group-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-group-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
