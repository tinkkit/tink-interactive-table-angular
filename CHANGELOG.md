# Changelog Tink interactive table Angular directive

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

<!--
## [Unreleased] - [unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## [3.1.4] - 2015-10-07

### Added
- Added an option that can add a column with checkboxes to the table, even if there are no actions defined

### Fixed
- Fixed an issue in the documentation



## [3.1.3] - 2015-10-06

### Changed
- Updated the documentation



## [3.1.2] - 2015-10-05

### Changed
- Changed the behaviour of the actions menu
- Upgraded the sort table dependency as the previous version had a bug where table headers would always be styled as sortable



## [3.1.1] - 2015-09-25

### Fixed
- Fixed a select issue in the pagination that was only occurring in Firefox



## [3.1.0] - 2015-09-22

### Changed
- Adjusted code, docs and unit tests to work with the new flex version of the bar



## [3.0.14] - 2015-09-18

### Changed
- Added more specific version of Tink core to bower.json since Tink 1.6.0 and higher will break the interactive table.



## [3.0.13] - 2015-08-24

### Changed
- Added a number filter to the pagination.



## [3.0.12] - 2015-07-29

### Changed
- Changed the responsive behaviour.



## [3.0.11] - 2015-07-29

### Added
- Added documentation.



## [3.0.10] - 2015-07-22

### Added
- Added tinkChecked callback to know when a checkbox is checked.



## [3.0.9] - 2015-07-22

### Fixed
- Fixed bug for not master and single selection



## [3.0.8] - 2015-07-14

### Added
- Added option to disable view or not view column



## [3.0.7] - 2015-07-10

### Added
- Added single action button



## [3.0.6] - 2015-07-10

### Fixed
- Fixed pagination 0-10



## [3.0.5] - 2015-07-10

### Fixed
- Fixed empty data string over multiple columns.



## [3.0.4] - 2015-07-09

### Added
- Added styling class to the dropdown



## [3.0.3] - 2015-07-09

### Added
- Added loading bind attribute



## [3.0.2] - 2015-07-07

### Changed
- Updated the readme



## [3.0.1] - 2015-07-06

### Added
- better styling for checkboxes



## [3.0.0] - 2015-07-06

### Added
- New interactive table

### Fixed
- Fixed field value bug in table body



## [2.2.3] - 2015-06-10

### Changed
- Updated documentation
- Separated code license



## [2.2.2] - 2015-06-08

### Changed
- Updated documentation



## [2.2.1] - 2015-06-02

### Fixed
- Fixed field value bug in table body



## [2.2.0] - 2015-06-01

### Added
- Added empty state message

### Fixed
- Fixed page number can't be under 0



## [2.1.9] - 2015-05-29

### Fixed
- Fixed pagination number can be negative (now can't)



## [2.1.8] - 2015-05-28

### Fixed
- Fixed pagination scope delay update



## [2.1.7] - 2015-05-28

### Fixed
- Fixed When multiple directives are used do not use same id for checkboxes



## [2.1.6] - 2015-05-27

### Added
- Added option to force a responsive table



## [2.1.5] - 2015-05-26

### Added
- Added filtering

### Fixed
- Fixed checkbox propagation



## [2.1.4] - 2015-05-26

### Fixed
- Fixed rotating arrow problem



## [2.1.3] - 2015-05-26

### Changed
- Changed documentation



## [2.1.2] - 2015-05-21

### Fixed
- Fixed problem don't sort on server side
- Fixed problems with callback



## [2.1.1] - 2015-05-21

### Fixed
- Fixed problems with callback



## [2.1.0] - 2015-05-20

### Added
- Row click callback



## [2.0.1] - 2015-05-11

### Added
- init type sort

### Fixed
- perPage callback



## [2.0.0] - 2015-05-08

### Added
- Pagination lazyload
- Full controll of pagination

### Changed
- Refactored component
- Extracted pagination



## [1.0.2] - 2015-05-??

### Removed
- Removed Lodash



## [1.0.1] - 2015-05-04

### Added
- Added checkbox class

### Changed
- Made actions optional



## [1.0.0] - 2015-04-23

Initial release
