
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Features

#### Frontend:
- [added modal (popup) window for timer reset confirmation](https://github.com/block-bites/fondant-app/pull/77)
- added auto Navbar refresh after timer reset

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
- [Documentation](https://github.com/block-bites/fondant-app/blob/master/OpenAPI.yml)  for the Lean API.
- Flask API deployed on the nctl container to ease up interaction between Lean API and nctl.
   

 
