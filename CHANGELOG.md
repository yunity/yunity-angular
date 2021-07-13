# Change Log

All notable changes to _Karrot_ will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

Types of changes:

  - `Added` for new features.
  - `Changed` for changes in existing functionality.
  - `Deprecated` for soon-to-be removed features.
  - `Removed` for now removed features.
  - `Fixed` for any bug fixes.
  - `Security` in case of vulnerabilities.


Please document your changes in this format:

```
  - description of change [#PR] @username
```

## [Unreleased]
### Added
- activity-list: enable ics subscriptions for activities @amengsk @larzon83 [#2368]
- Users can revoke trust @pogopaule [#2352]

### Changed
- Remove invitation by e-mail at members page @brnsolikyl [#2349]

### Fixed
- add explicit host in ics url @amengsk [#2406]

## [9.4.0] - 2021-06-24
### Changed
- landingpage: reduce bundlesize for generated images @larzon83 [#2377]
- use geo ip for edit/create group default map location @nicksellen [#2396]
- implement more activity statistics @nicksellen [#2364]

### Fixed
- place-header: correctly display linear-gradient in Safari @larzon83 [#2372]
- Redirect again to last visited group @tiltec [#2373]
- remove iconpicker-app-extension @larzon83 [#2387]
- application chat: author name sometimes would display as '?' for the applicant @tiltec
- improve group info API performance @tiltec [#2383]

## [9.3.0] - 2021-06-03
### Added
- allow to dismiss feedback @dpaque @layla19 @larzon83 @pogopaule [#2319]
- Add request/db timeout options @nicksellen [#1143](https://github.com/yunity/karrot-backend/pull/1143)
- Added country code and timezone to geo ip info @nicksellen [#1134](https://github.com/yunity/karrot-backend/pull/1134)
- API for revoking trust @pogopaule [#1133](https://github.com/yunity/karrot-backend/pull/1133)
- API for calendar subscriptions @amengsk [#1132](https://github.com/yunity/karrot-backend/pull/1132)
- add ics export for activities @amengsk @larzon83 [#2321]

### Changed
- amount-picker: improve UX of weight slider limits @larzon83 @layla19 @dpaque @pogopaule [#2348]
- group: improve create/edit group form @larzon83 @layla19 @dpaque @pogopaule @brnsolikyl [#2306]
- landingpage: improve design @larzon83 [#2340]
- Landing page: change text and screenshots, add "about Karrot" component @brnsolikyl [#2317]
- Improve calculation of map bounds on group gallery @nicksellen [#2333]
- main-layout: use scaled down background-image @larzon83 [#2371]
- Use roboto font in latin-ext variant @nicksellen [#2345]

### Fixed
- Place statistics feedback weight should be summed @nicksellen [#1137](https://github.com/yunity/karrot-backend/pull/1137)
- Fixed slow messages query @tiltec [#1141](https://github.com/yunity/karrot-backend/pull/1141)
- Fixed slow place statistics query @tiltec [#1144](https://github.com/yunity/karrot-backend/pull/1144)

## [9.2.0] - 2021-03-23
### Added
- enabled Hungarian locale @nicksellen [#2313]
- add activity type editing @nicksellen [#2245]

### Changed
- use default group location for defaultMapCenter when creating a new place @larzon83 [#2293]
- Remove disabled pickups on applied filters on pickups page @pogopaule [#2271]
- activities: improve design and UX of activities listing @larzon83 [#2303]
- Small redesign of place page @brnsolikyl [#2266]

### Fixed
- activities: only hover pictures if device supports it @larzon83 [#2297]

## [9.1.0] - 2020-01-06
### Fixed
- Fix group switcher image sizes @nicksellen [#2283]
- Fix group ordering when no geoip @nicksellen

## [9.0.0] - 2020-12-16
### Added
- Add activity types @nicksellen [#2207]
- Add "forever" activity statistics time period @nicksellen [#2230]
- Save message drafts @nicksellen [#2211]
- Emphasize nearby groups @nicksellen [#2212]

### Changed
- Highlight application form input @tiltec [#2210]
- Accept/decline applications from the chat sidebar @nicksellen [#2232]

### Fixed
- Don't cache index.html @nicksellen [#2210]
- Fix issue selection @tiltec
- Fix small map toggles @nicksellen [#2231]
- Fix playstore rollout method @tiltec
- Fix group select on profile page @brnsolikyl [#2234]

## [8.8.1] - 2020-10-12
### Fixed
- Fix playstore image types @nicksellen

## [8.8.0] - 2020-10-12
### Added
- Karrot can now be added to your homescreen (installed as App). Check out the button at the bottom of your profile settings page! @tiltec
- Added group activity statistics display @nicksellen

### Changed
- Move "not connected" message into topbar for mobile view @tiltec
- Add message when Karrot is trying to reconnect @tiltec

## [8.7.2] - 2020-08-28
### Changed
- Enable the Luxembourgish locale of Quasar and date-fns when this language is selected @dwaxweiler
- Do not offer to join the playground group during signup, to avoid confusion @tiltec

## [8.7.1] - 2020-08-27
### Added
- Allow images to be attached to messages [#2128] [#1028](https://github.com/yunity/karrot-backend/pull/1028) @nicksellen
- Display number of total group members on top of member list [#2149] @djahnie

### Changed
- Improve activity history display to show activity information more clearly [#2151] from [suggestion](https://community.foodsaving.world/t/how-do-you-handle-late-drop-outs-from-pickups/213/10) @nicksellen
- Only show pull-to-refresh in app @tiltec
- Sort feedback by activity date instead of feedback date [#2157] [#2161] [#1044](https://github.com/yunity/karrot-backend/pull/1044) @nicksellen

## [8.6.0] - 2020-07-17
### Changed
- All group members (instead of just editors) can now access conflict resolution issues, write messages and vote. Issues can still only be created by editors. [#2062] @tiltec

### Fixed
- Add max height to message input to prevent send button becoming hidden @nicksellen
- Users couldn't withdraw applications to archived groups @tiltec

## [8.5.2] - 2020-06-01
### Changed
- Show failed email deliveries also when email is not verified @tiltec

## [8.5.1] - 2020-05-24
### Changed
- Show ongoing pickups to all group members, not just those who signed up [#1789] @tiltec
- Updated translations

## [8.5.0] - 2020-05-18
### Added
- Notification when a new Karrot version is available @tiltec

### Changed
- Subscribe everybody to conflict resolution emails by default @nicksellen
- Speed up page load (hopefully) @tiltec @nicksellen
- Hide buttons in group sidenav, change notification icons, added settings to latest messages menu [#1987] @brnsolikyl @nicksellen
- Show instruction on group preview page how to revive groups without members @tiltec
- Switch to group when clicking on user-related notificiations @tiltec
- Remove "public description" toggle from group description page, as it is available from the sidenav already @tiltec
- In group gallery, move groups with your application pending to the top @tiltec

### Fixed
- Unsubscribe link in pickup notification email did not work @nicksellen
- Names in application chat were normally not visible for the applicant @tiltec
- "Forgot your password?" page didn't show validation errors @tiltec
- Selecting to join playground group after signup didn't actually join the group @tiltec

## [8.4.0] - 2020-04-25
### Added
- Pagination for pickups [#1982] @ang-zeyu
- More translations

### Fixed
- Karrot icon on dev.karrot.world did not show @tiltec

## [8.3.0] - 2019-12-02
### Added
- Offers (behind feature flag) [#1799] @nicksellen

## [8.2.0] - 2019-11-17
### Added
- Group messages from same author @teemukaaria

### Changed
- Add autocomplete for addresses again @nicksellen

## [8.1.2] - 2019-11-05
### Fixed
- Restoring a place was broken @tiltec

## [8.1.1] - 2019-10-23
### Fixed
- Leaving a group didn't work @tiltec

## [8.1.0] - 2019-10-17
### Added
- History CSV export API @tiltec

### Changed
- Sum multiple feedback entries per pickup instead of averaging them @tiltec

### Fixed
- Message links in email notifications did not open the conversation if message is a reply, in an application or in an issue @tiltec

## [8.0.0] - 2019-10-07
### Added
- Show group image in emails @nicksellen

### Changed
- User Interface redesign due to [Quasar](https://quasar.dev) upgrade [#1690] @tiltec

## [7.4.2] - 2019-08-14
### Added
- General purpose group theme [#1691] @djahnie

## [7.4.1] - 2019-08-09
### Added
- "Unsubscribe all" button on settings page @tiltec @djahnie
- Luxembourgish locale

### Changed
- Updated German translation

### Fixed
- Pickups could be set to empty durations which caused further problems @tiltec

## [7.4.0] - 2019-05-25
### Added
- Bike kitchen theme [#1509] @tiltec @djahnie

### Changed
- Rename stores to places in UI [#1398] @tiltec @djahnie
- Separate conversations and threads in message notifications @tiltec @djahnie
- Move language picker to user settings @tiltec @djahnie
- Move community feed to sidenav @tiltec @djahnie
- Invitations can be resent after 1 hour [#837] @mvellasco
- Move place description into modal @tiltec
- Move notification settings to user settings @tiltec @djahnie
- Move applications from group wall into sidenav @tiltec
- Require opt-in to application notification emails @tiltec
- Do not add members to application chats anymore @tiltec

### Fixed
- Permission checks in main routes had a typo and were not active @djahnie @tiltec
- One-time pickups didn't show their duration if they had one @tiltec
- Context menu in fullscreen map did not work @tiltec

## [7.3.0] - 2019-04-29
### Added
- Show people who marked a place as favorite @tiltec
- Extend emoji reaction picker, add search bar [#1421] @andreseg9726 @MacNGz

### Changed
- Show weekday of pickup in feedback list @tiltec
- Limit community feed to "Karrot" category @tiltec
- Place navigation moved to tabs @tiltec

### Fixed
- New thread replies didn't show a green chip in the toolbar @tiltec
- Inline code blocks in Markdown would insert a line break @tiltec

## [7.2.4] - 2019-04-11
### Fixed
- Users wouldn't get marked as active, regression in 7.2.2 @tiltec

## [7.2.3] - 2019-04-05
### Fixed
- Invitation form didn't show error messages @tiltec
- Applications wouldn't get withdrawn when the user accepts an invitation @tiltec

## [7.2.2] - 2019-04-04
### Added
- Groups can specify a welcome message that applicants receive after they've been accepted [#1038] @cstefanj

## [7.2.1] - 2019-03-29
### Added
- For mobile users: touch and hold on a reaction emoji to show who reacted @tiltec

### Changed
- Some design improvements for conflict resolution @djahnie

### Fixed
- Pickup "join" and "leave" history entries didn't show the date of the pickup, regression from adding pickups with end times @tiltec

## [7.2.0] - 2019-03-27
### Added
- Conflict resolution within groups @taistadam @djahnie @tiltec @nicksellen

### Changed
- Synchronize community feed notifications with backend @tiltec

## [7.1.0] - 2019-03-17
### Added
- Initial Marathi translation @Rahul Shinde

### Changed
- Mobile page: reduce width of sidenav @tiltec
- Relax connectivity check timeout from 2 to 5 seconds @tiltec

### Fixed
- Previous feedback didn't show when giving/editing feedback @tiltec

## [7.0.0] - 2019-03-12
### Added
- Add ability to specify pickups with end times [#709] @nicksellen
- Add store wall [#986] @tiltec
- Add feature to mark stores as favorite [#986] @tiltec
- Add slots filter to group pickup list @tiltec

### Changed
- Allow non-collectors to read and write in pickup chat @tiltec
- Pickups from non-favorited stores won't show up in the "available pickup" in the group wall and don't send emails about upcoming pickups @tiltec
- Can now unsubscribe from conversations (except private conversation and threads) @tiltec
- Show store name instead of "Current store" in sidenav @tiltec

### Fixed
- Ended conversations weren't closed if they had no messages @tiltec

## [6.5.0] - 2019-02-03
### Added
- Close application, pickup and issue chats after they ended [#1088] @tiltec

### Changed
- Mark latest messages as seen when visiting the menu, without the need to mark all messages as read @tiltec
- Dim topbar buttons and make them brighter when there's something interesting in them @tiltec
- Application list now supports pagination @tiltec

### Fixed
- Long group names would break the applicant chat @tiltec
- Group photo upload was broken when creating a new group, it's now hidden from the from @tiltec
- "User became editor" bell notification would show each time when a user joins the playground group, introduced in 6.4.0 [#1140] @tiltec

## [6.4.0] - 2019-01-18
### Added
- Support for group logos [#891] @cstefanj @tiltec

### Changed
- Don't send application conversation notification emails to inactive group members @tiltec

### Fixed
- User sometimes wouldn't get marked as active if they switched between groups @tiltec

## [6.3.0] - 2019-01-13
### Added
- Pickups can be disabled and enabled again [#1147] @tiltec
- Notifications for enabled, disabled and moved pickups [#1147] @tiltec
- Show dialog when editing recurring pickups if pickups diverge from defaults [#1147] @tiltec
- Buttons to reset pickups to defaults [#1147] @tiltec
- Can unsubscribe to notifications without being signed in [#1174] @nicksellen

### Changed
- More details for the pickup series manage page [#1147] @tiltec
- Pickups in a pickup series can't be moved anymore, to prevent hard-to-predict problems [#1147] @tiltec
- Replies to wall message via email now go into a thread [#1079] @tiltec
- Wait 5 seconds before triggering refresh in app @tiltec
- Order of pickup collectors is now kept [#1157] @lwm
- Displaying past pickups (-30min) for users who are members of that pickup [#1178] @djahnie @taistadam
- Always try to send account-related emails, even if the user triggered a List-Unsubscribe before @tiltec

### Fixed
- Tapping on push notification showed login page when user is already logged in (second try) @tiltec
- External link detection was not working in app @tiltec
- Group links on map didn't work when logged out @tiltec

## [6.2.9] - 2018-12-12
### Fixed
- Pickups manage page could not be loaded, regression in 6.2.8 @tiltec

## [6.2.8] - 2018-12-11
### Added
- Added info button and dialogue about inactivity [#1139] @djahnie

### Changed
- Green store link in feedback list now points to store feedback list, pointed to store pickup list before @tiltec

### Fixed
- Group info did not load when clicking on map popup, regression in 6.2.7 @tiltec
- Alerts to give feedback were not filtered properly [#1138] @tiltec

## [6.2.7] - 2018-11-28
### Fixed
- App refreshed data too frequently, sometimes during route change @tiltec
- Tapping on push notification showed login page when user is already logged in @tiltec
- Tapping on push notification did not switch groups when app is in background @tiltec
- Conversation metadata did not get refreshed sometimes @tiltec

## [6.2.6] - 2018-11-18
### Changed
- Remove unneeded files from Android app, reduces size to 4 MB @tiltec
- Added Safari 9 as unsupported browser @tiltec

### Fixed
- Store did not update after saving @tiltec

## [6.2.5] - 2018-11-13
### Added
- Splash screen while karrot is loading @tiltec

### Changed
- Do not clear data on refresh, should reduce empty screens in app @tiltec
- Hide browser push setting in app @tiltec
- Community forum notifier shows avatar of last poster instead of original poster @tiltec @djahnie
- Show server and network errors when submitting forms @tiltec
- Mobile pull-to-refresh on all pages (before just on wall) @tiltec
- Better push notification titles @tiltec
- Do not send push notifications about muted conversations @tiltec

### Removed
- Built-in app updater; rely on Play Store for updates instead @tiltec

### Fixed
- Marker popup urls in app were broken @tiltec
- Group description view didn't use full width @tiltec
- Alerts about server errors were shown when network errors happened @tiltec
- Message could get lost if network was unstable @tiltec
- User didn't get redirect to group @tiltec
- Pickup chat title bar was missing @tiltec

## [6.2.4] - 2018-11-07
### Changed
- Frontend code structure is now organized into modules @tiltec

### Fixed
- Notification items would sometimes cause errors when related pickups haven't been loaded @tiltec
- Sidenav title on mobile shows notification and message icons when logged out @tiltec
- Sidenav open/closed state was sometimes inconsistent @tiltec

## [6.2.3] - 2018-10-26
### Changed
- Better identification of messages from users who left the group @tiltec
- Keep client data up-to-date when group members join or leave @tiltec
- Always send android and web push notifications, even when the client is online @tiltec
- Further improved KNotice especially for small screens @tiltec
- "Back to top" button has been removed to improve usability @tiltec
- Do not collapse sidenav boxes on mobile @tiltec
- Set minimum length of user names to 3 characters @tiltec
- Move "show more" button in messages popover to bottom @tiltec
- Load only conversations with unread messages by default @tiltec

### Fixed
- Applications of deleted users are now properly withdrawn @tiltec
- Make login error message translatable @tiltec
- Fix problematic concatenated translation message in trust dialog @tiltec

## [6.2.2] - 2018-10-21
### Changed
- App push icon now resembles the Karrot logo better @tiltec
- Mobile chat and wall input now try to keep the cursor on screen @tiltec
- Mobile chat header now collapses properly @tiltec
- Move application actions into popover @tiltec

### Fixed
- App push notifications @tiltec
- Clicking notification redirects to the appropriate page @tiltec
- User profile picture did not show in app @tiltec
- Upcoming pickup notifications have been deleted and recreated constantly @tiltec
- User profile didn't reliably load when another user profile was open before @tiltec
- Applications couldn't be accepted or declined on mobile @tiltec

## [6.2.1] - 2018-10-17
### Added
- Notification if connection was lost @tiltec

### Fixed
- Make applications more mobile-friendly [#1112] @djahnie

## [6.2.0] - 2018-08-27
### Added
- Newcomer role and trust system [#1077] @tiltec
- On-site notifications in topbar [#1099] @tiltec
- Deploy android app to Play Store @tiltec @djahnie
- Record statistics about which profile features are used @tiltec

### Fixed
- Fix application chat initial questions layout [#1097] @nicksellen
- Application user was sometimes missing @djahnie
- Disable unwanted HTML support in map popups @tiltec
- Invalid dates when application has been withdrawn @tiltec

## [6.1.0] - 2018-08-31
### Added
- Conversations overview page [#1070] @tiltec

### Changed
- Feedback list design @tiltec
- LocaleSelect and CommunityFeed improved for mobile @tiltec
- Speed up feedback loading by including related pickups @tiltec

### Fixed
- Loading of application chat @tiltec
- Pickups: access to undefined properties while loading @tiltec
- Redirect to groups gallery when user got logged out @tiltec

## [6.0.0] - 2018-08-25
### Added
- Replies to wall messages [#1065] @nicksellen @tiltec
- Link to external route planner for store directions [#1020] @pogopaule @tiltec
- Add notifications about new messages in community.foodsaving.world @tiltec
- Group applications [#1063] [#1082] @djahnie @taistadam @tiltec @nicksellen

### Changed
- Merge message notification emails together if messages are sent within 5 minutes @tiltec
- Prevent notifications for seen messages @tiltec
- Hide markdown preview in sidebar @tiltec
- External links, email links and phone links in markdown now have a small icon @tiltec
- Internal links open in the same tab @tiltec
- Unified desktop/mobile sidenav [#1071] @nicksellen

### Removed
- Group password; affected groups have been migrated to applications

## [5.0.0] - 2018-07-16
### Added
- web browser push notifications @nicksellen
- sorting and search for the group member list @tiltec
- show failed email notifications @tiltec
- add user conversations @tiltec
- add pickup conversations @nicksellen
- filter controls and back button for fullscreen group map @tiltec
- context menu to create new store in group map @tiltec
- add message editing @tiltec
- refresh most data when karrot app wakes up @tiltec
- mobile "pull-to-refresh" in group wall @tiltec
- automatically mark group as active or inactive @oldPadavan
- send correct email template on resend verification code @pogopaule @tiltec
- (more, but we didn't keep a changelog lately...)

### Changed
- speed up initial loading and rendering @nicksellen
- unify color usage @tiltec
- custom leaflet marker component to allow quasar colors @tiltec
- rework of feedback form to allow feedback without weight @tiltec

### Fixed
- lots of bugs

## [4.0.0] - 2017-12-27
Complete frontend rewrite with [VueJS](http://vuejs.org/) and [Quasar](http://quasar.dev/)

### Added
- Group conversations
- Store statuses
- Pickup and series description field

### Changed
- Broad design and UI changes; more colors
- Rename from `foodsaving tool` to `karrot`

### Removed
- AngularJS

### Fixed
- Lots of stuff

## [3.0.0] - 2017-07-03
### Added
- Landing page with a map of all groups, new title font (Cabin Sketch)
- User action history for groups and stores, with extensive filtering capabilities
- Store management page with overview of all pickup date settings, incl. editing/deleting of pickup dates and series, and even pickup dates that are part of a series
- Updated locales: German, Esperanto, Spanish, French, Italian, Russian, Swedish
- New locale: Chinese
- We do regular off-site backups now :)
- Public group page for groups to show their information
- Proper translatable e-mail templates, makes integration of HTML mails easier
- Walkthrough page (to be found in the blog)
- Link to our facebook group in the topbar
- Translation progress indicator in the menu

### Changed
- Store editing with markdown preview
- Store create now uses the same form as store editing, incl. nice address input
- Minimum group & store name length (5 resp. 3 characters)
- Group names have to be unique, and store names have to be unique within their group
- Changes to group and store name will do immediate updates throughout the page
- Locations can be set by clicking on a map and by dragging the marker around
- During creation, give feedback if a group name or a store name within a group is already taken
- Remember chosen group and chosen language acrosss browsers and devices
- On the store page, the create pickup button has been replaced with a "manage pickup dates" button, increasing the reachability of that page
- Date selector only allows today and dates in the future

### Removed
- Inline editing. Now all editing happens on separate edit pages with URLs

### Fixed
- Removed nested scrollbars
- Translatable markdown help
- Translated backend error messages
- Removed unused translation keys
- Disable autoformatting features on login and signup page
- Disable buttons when a request is in progress
- Mail change now happens after the new mail is verified
- Fix missing aria-label causing test to fail
- After changing email addresses, show new addresses in the verification interface

## [2.0.0] - 2017-02-21
### Added
- Pickup dates can now be created as weekly series
- Translations: German, French, Swedish, Spanish, Italian, Russian and Esperanto
- Show group information before joining
- Groups can ask for a password
- Mail verification on sign-up
- User can change password and mail
- Users can request a new password via mail
- "Call for collaboration" on front page
- Favicon
- Loading bar to show when server requests are in progress
- Nice loading dots
- Automated login after signing up
- Small popup to inform users about timeouts and server errors

### Changed
- Main deployment to foodsaving.world
- Two-column layout for groups and stores
- New brown-ish color scheme
- Dynamic page title
- Group and store info field (description) supports markdown formatting
- Groups need a timezone setting (defaults to Europe/Berlin)

### Removed
- Inline-editing with angular-xeditable

### Fixed
- Hide map when there is no location
- Dialog is hidden by map
- Scrolling issues
- Less server requests for showing pickup dates
- Disabled auto-capitalization on login page
- many small issues...

## 1.0.0 - 2016-12-14
After months of planning and programming, the first version of ~the foodsaving tool~ _karrot_ is ready!

### Added
- **user**: sign-up with name, password and email address
- **group**: create a group, add yourself to a group, leave a group, set up name and description
- **store**: create a store which belongs to a group, set up name, description, address and position of a store
- **pick-up dates**: create a pick-up date which belongs to a store, set time and max. amount of people who can collect food, user can join/leave a pick-up date

[#709]: https://github.com/yunity/karrot-frontend/issues/709
[#837]: https://github.com/yunity/karrot-frontend/issues/837
[#891]: https://github.com/yunity/karrot-frontend/issues/891
[#986]: https://github.com/yunity/karrot-frontend/issues/986
[#1020]: https://github.com/yunity/karrot-frontend/issues/1020
[#1038]: https://github.com/yunity/karrot-frontend/issues/1038
[#1063]: https://github.com/yunity/karrot-frontend/issues/1063
[#1065]: https://github.com/yunity/karrot-frontend/issues/1065
[#1070]: https://github.com/yunity/karrot-frontend/issues/1070
[#1071]: https://github.com/yunity/karrot-frontend/issues/1071
[#1077]: https://github.com/yunity/karrot-frontend/issues/1077
[#1079]: https://github.com/yunity/karrot-frontend/issues/1079
[#1082]: https://github.com/yunity/karrot-frontend/issues/1082
[#1088]: https://github.com/yunity/karrot-frontend/issues/1088
[#1097]: https://github.com/yunity/karrot-frontend/issues/1097
[#1099]: https://github.com/yunity/karrot-frontend/issues/1099
[#1112]: https://github.com/yunity/karrot-frontend/issues/1112
[#1138]: https://github.com/yunity/karrot-frontend/issues/1138
[#1139]: https://github.com/yunity/karrot-frontend/issues/1139
[#1140]: https://github.com/yunity/karrot-frontend/issues/1140
[#1147]: https://github.com/yunity/karrot-frontend/issues/1147
[#1157]: https://github.com/yunity/karrot-frontend/issues/1157
[#1174]: https://github.com/yunity/karrot-frontend/issues/1174
[#1178]: https://github.com/yunity/karrot-frontend/issues/1178
[#1398]: https://github.com/yunity/karrot-frontend/issues/1398
[#1421]: https://github.com/yunity/karrot-frontend/issues/1421
[#1509]: https://github.com/yunity/karrot-frontend/issues/1509
[#1690]: https://github.com/yunity/karrot-frontend/issues/1690
[#1691]: https://github.com/yunity/karrot-frontend/issues/1691
[#1789]: https://github.com/yunity/karrot-frontend/issues/1789
[#1799]: https://github.com/yunity/karrot-frontend/issues/1799
[#1982]: https://github.com/yunity/karrot-frontend/issues/1982
[#1987]: https://github.com/yunity/karrot-frontend/issues/1987
[#2062]: https://github.com/yunity/karrot-frontend/issues/2062
[#2128]: https://github.com/yunity/karrot-frontend/issues/2128
[#2149]: https://github.com/yunity/karrot-frontend/issues/2149
[#2151]: https://github.com/yunity/karrot-frontend/issues/2151
[#2157]: https://github.com/yunity/karrot-frontend/issues/2157
[#2161]: https://github.com/yunity/karrot-frontend/issues/2161
[#2207]: https://github.com/yunity/karrot-frontend/issues/2207
[#2210]: https://github.com/yunity/karrot-frontend/issues/2210
[#2211]: https://github.com/yunity/karrot-frontend/issues/2211
[#2212]: https://github.com/yunity/karrot-frontend/issues/2212
[#2230]: https://github.com/yunity/karrot-frontend/issues/2230
[#2231]: https://github.com/yunity/karrot-frontend/issues/2231
[#2232]: https://github.com/yunity/karrot-frontend/issues/2232
[#2234]: https://github.com/yunity/karrot-frontend/issues/2234
[#2245]: https://github.com/yunity/karrot-frontend/issues/2245
[#2266]: https://github.com/yunity/karrot-frontend/issues/2266
[#2271]: https://github.com/yunity/karrot-frontend/issues/2271
[#2283]: https://github.com/yunity/karrot-frontend/issues/2283
[#2293]: https://github.com/yunity/karrot-frontend/issues/2293
[#2297]: https://github.com/yunity/karrot-frontend/issues/2297
[#2303]: https://github.com/yunity/karrot-frontend/issues/2303
[#2306]: https://github.com/yunity/karrot-frontend/issues/2306
[#2313]: https://github.com/yunity/karrot-frontend/issues/2313
[#2317]: https://github.com/yunity/karrot-frontend/issues/2317
[#2319]: https://github.com/yunity/karrot-frontend/issues/2319
[#2321]: https://github.com/yunity/karrot-frontend/issues/2321
[#2333]: https://github.com/yunity/karrot-frontend/issues/2333
[#2340]: https://github.com/yunity/karrot-frontend/issues/2340
[#2345]: https://github.com/yunity/karrot-frontend/issues/2345
[#2371]: https://github.com/yunity/karrot-frontend/issues/2371
[#2372]: https://github.com/yunity/karrot-frontend/issues/2372
[#2373]: https://github.com/yunity/karrot-frontend/issues/2373
[#2377]: https://github.com/yunity/karrot-frontend/issues/2377
[#2383]: https://github.com/yunity/karrot-frontend/issues/2383
[#2387]: https://github.com/yunity/karrot-frontend/issues/2387
[#2396]: https://github.com/yunity/karrot-frontend/issues/2396

[Unreleased]: https://github.com/yunity/karrot-frontend/compare/v9.4.0...HEAD
[9.4.0]: https://github.com/yunity/karrot-frontend/compare/v9.3.0...v9.4.0
[9.3.0]: https://github.com/yunity/karrot-frontend/compare/v9.2.0...v9.3.0
[9.2.0]: https://github.com/yunity/karrot-frontend/compare/v9.1.0...v9.2.0
[9.1.0]: https://github.com/yunity/karrot-frontend/compare/v9.0.0...v9.1.0
[9.0.0]: https://github.com/yunity/karrot-frontend/compare/v8.8.1...v9.0.0
[8.8.1]: https://github.com/yunity/karrot-frontend/compare/v8.8.0...v8.8.1
[8.8.0]: https://github.com/yunity/karrot-frontend/compare/v8.7.2...v8.8.0
[8.7.2]: https://github.com/yunity/karrot-frontend/compare/v8.7.1...v8.7.2
[8.7.1]: https://github.com/yunity/karrot-frontend/compare/v8.6.0...v8.7.1
[8.6.0]: https://github.com/yunity/karrot-frontend/compare/v8.5.2...v8.6.0
[8.5.2]: https://github.com/yunity/karrot-frontend/compare/v8.5.1...v8.5.2
[8.5.1]: https://github.com/yunity/karrot-frontend/compare/v8.5.0...v8.5.1
[8.5.0]: https://github.com/yunity/karrot-frontend/compare/v8.4.0...v8.5.0
[8.4.0]: https://github.com/yunity/karrot-frontend/compare/v8.3.0...v8.4.0
[8.3.0]: https://github.com/yunity/karrot-frontend/compare/v8.2.0...v8.3.0
[8.2.0]: https://github.com/yunity/karrot-frontend/compare/v8.1.2...v8.2.0
[8.1.2]: https://github.com/yunity/karrot-frontend/compare/v8.1.1...v8.1.2
[8.1.1]: https://github.com/yunity/karrot-frontend/compare/v8.1.0...v8.1.1
[8.1.0]: https://github.com/yunity/karrot-frontend/compare/v8.0.0...v8.1.0
[8.0.0]: https://github.com/yunity/karrot-frontend/compare/v7.4.2...v8.0.0
[7.4.2]: https://github.com/yunity/karrot-frontend/compare/v7.4.1...v7.4.2
[7.4.1]: https://github.com/yunity/karrot-frontend/compare/v7.4.0...v7.4.1
[7.4.0]: https://github.com/yunity/karrot-frontend/compare/v7.3.0...v7.4.0
[7.3.0]: https://github.com/yunity/karrot-frontend/compare/v7.2.4...v7.3.0
[7.2.4]: https://github.com/yunity/karrot-frontend/compare/v7.2.3...v7.2.4
[7.2.3]: https://github.com/yunity/karrot-frontend/compare/v7.2.2...v7.2.3
[7.2.2]: https://github.com/yunity/karrot-frontend/compare/v7.2.1...v7.2.2
[7.2.1]: https://github.com/yunity/karrot-frontend/compare/v7.2.0...v7.2.1
[7.2.0]: https://github.com/yunity/karrot-frontend/compare/v7.1.0...v7.2.0
[7.1.0]: https://github.com/yunity/karrot-frontend/compare/v7.0.0...v7.1.0
[7.0.0]: https://github.com/yunity/karrot-frontend/compare/v6.5.0...v7.0.0
[6.5.0]: https://github.com/yunity/karrot-frontend/compare/v6.4.0...v6.5.0
[6.4.0]: https://github.com/yunity/karrot-frontend/compare/v6.3.0...v6.4.0
[6.3.0]: https://github.com/yunity/karrot-frontend/compare/v6.2.9...v6.3.0
[6.2.9]: https://github.com/yunity/karrot-frontend/compare/v6.2.8...v6.2.9
[6.2.8]: https://github.com/yunity/karrot-frontend/compare/v6.2.7...v6.2.8
[6.2.7]: https://github.com/yunity/karrot-frontend/compare/v6.2.6...v6.2.7
[6.2.6]: https://github.com/yunity/karrot-frontend/compare/v6.2.5...v6.2.6
[6.2.5]: https://github.com/yunity/karrot-frontend/compare/v6.2.4...v6.2.5
[6.2.4]: https://github.com/yunity/karrot-frontend/compare/v6.2.3...v6.2.4
[6.2.3]: https://github.com/yunity/karrot-frontend/compare/v6.2.2...v6.2.3
[6.2.2]: https://github.com/yunity/karrot-frontend/compare/v6.2.1...v6.2.2
[6.2.1]: https://github.com/yunity/karrot-frontend/compare/v6.2.0...v6.2.1
[6.2.0]: https://github.com/yunity/karrot-frontend/compare/v6.1.0...v6.2.0
[6.1.0]: https://github.com/yunity/karrot-frontend/compare/v6.0.0...v6.1.0
[6.0.0]: https://github.com/yunity/karrot-frontend/compare/v5.0.0...v6.0.0
[5.0.0]: https://github.com/yunity/karrot-frontend/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/yunity/karrot-frontend/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/yunity/karrot-frontend/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/yunity/karrot-frontend/compare/v1.0.0...v2.0.0
