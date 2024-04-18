# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Added

#### Frontend

- [Added support for smaller screens](https://github.com/block-bites/fondant-app/pull/91)
- [Added modal (popup) window for networks reset confirmation](https://github.com/block-bites/fondant-app/pull/77)
- [Added preloaders for all pages, visual bugs fixed](https://github.com/block-bites/fondant-app/pull/80)
- [Added loader to topbar start/pasue buttons](https://github.com/block-bites/fondant-app/issues/81)
- Prepared frontend to handle CCTL

#### Backend

- Exchanged NCTL container to in-house created CCTL container
- Discarded Lean API. Now the API uses rust rocket framework.
- Merged API and CCTL containers.
- Run endpoint that is compatible with all CCTL commands.

### Fixed

#### Frontend

- [Deploy, Event and Logs mapped elements are separated](https://github.com/block-bites/fondant-app/pull/78)
- [Navbar menu is working correctly](https://github.com/block-bites/fondant-app/pull/64)
- [Fixed access to all other subpages when network is not initialized](https://github.com/block-bites/fondant-app/issues/85)
- [Fixed Start/Pause buttons](https://github.com/block-bites/fondant-app/issues/82)
- Fixed pagination on all subpages

## [1.0.0] - 2024-01-15

### Added

#### Frontend

- Accounts page. Displays users private and public keys.
- Logs, Event and Deploy pages presenting with JSON info on each coressponding topic.
- Blocks page, displays basic information about block generated on the network.
- Ability to change observed node.
- Reset button for the network.

#### Backend

- Lean API that acts as a proxy for the original nctl container.
- [Documentation](https://github.com/block-bites/fondant-app/blob/master/OpenAPI.yml) for the Lean API.
- Flask API deployed on the nctl container to ease up interaction between Lean API and nctl.
