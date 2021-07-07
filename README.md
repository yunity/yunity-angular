
<div align="center">
  <img width="200" src="https://karrot.world/statics/carrot_logo.png">
<h2>karrot</h2>
<p>Start a group, become a community</p>
</div>

Karrot is a free and open-source tool for grassroots initiatives and groups of people that want to coordinate face-to-face activities on a local, autonomous and voluntary basis.

It is designed in ways to enable community-building and support a more transparent, democratic and participatory governance of your group.

<div align="center">
  <img height="300" src="https://github.com/yunity/karrot-frontend/raw/master/src/base/pages/images/app-screenshots-browser/karrot-screenshot-browser-800.png">
  <img width="20" src="https://user-images.githubusercontent.com/4410802/42418563-705d917c-82a3-11e8-91d8-8a234af008e4.png">
  <img height="240" src="https://github.com/yunity/karrot-frontend/raw/master/src/base/pages/images/app-screenshots-phone/karrot-screenshot-phone-200.png">
</div>
<br>
<br>

This is the frontend repository, i.e. the browser-side software that powers [karrot.world](https://karrot.world). Have a look at our server-side code at [karrot-backend](https://github.com/yunity/karrot-backend), too!

## Features

- manage information about places :apple:
- schedule both one-time and recurring activities :calendar:
- gather feedback about activities :mag:
- talk with users before they become group members :heavy_plus_sign:
- let newcomers show their trust and get involved :bulb:
- communicate with your team via group, place, activity, and private chats :speech_balloon:
- handle team member conflicts via score voting :star:
- receive real-time notifications via our Android app, e-mail, and web browser push notifications :loudspeaker:
- use karrot in your preferred language :globe_with_meridians:
- upload a group logo and customize your public information :camera:

## Foodsaving worldwide

The [foodsaving worldwide team](https://foodsaving.world/team) provides additional resources to build up foodsaving, e.g. an infopage on [foodsaving.world](https://foodsaving.world), where all the intel is gathered.

## Development goals

Our current development goals are prioritized and written down in our [elaborate roadmap](ROADMAP.md).

## Releases

For a quick overview of recent changes and our version history have a look at our [change log file.](CHANGELOG.md)

## Translation

We are using [Transifex](https://www.transifex.com/) to provide _karrot_ in many languages. To help us with translation, please [create an account](http://transifex.com/signup) and [apply for the _karrot_ group](https://www.transifex.com/yunity-1/karrot/frontend/).

After selecting your target language and choosing the resource file, go ahead to start translating!

## Setup

- [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install)

To clone and install:

```
git clone https://github.com/yunity/karrot-frontend.git
cd karrot-frontend
yarn
```

To run the local dev server:

```
yarn dev
```

To lint and run the tests:

```
yarn lint
yarn test
```

If you want to use an eslint plugin for your editor, please keep in mind that you either have to install all eslint plugins listed in package.json globally or you run `yarn install`. Otherwise your eslint plugin may not work.

## Start contributing?

We have a forum for Karrot developers and users at https://community.foodsaving.world/c/karrot.

If you are interested in contributing, you may -
- join us in the [#karrot-dev chatroom on chat.karrot.world](https://chat.karrot.world/channel/karrot-dev)
- join our weekly call; previous minutes can be found in [this thread](https://community.foodsaving.world/t/weekly-call-about-karrot-development/289)

The most important information is written down in our [contribution guidelines](CONTRIBUTE.md).

The [backend](https://github.com/yunity/karrot-backend) is developed to support this frontend. If you find a bug or miss something in the API, please file an issue in the backend repository.

## Contributors

Significant contributors to karrot:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4410802?v=4" width="100px;"/><br /><sub><b>Tilmann Becker</b></sub>](https://github.com/tiltec)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=tiltec "Code") [🤔](#ideas-tiltec "Ideas, Planning, & Feedback") [🚇](#infra-tiltec "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-tiltec "Reviewed Pull Requests") [⚠️](https://github.com/yunity/karrot-frontend/commits?author=tiltec "Tests") [💬](#question-tiltec "Answering Questions") | [<img src="https://avatars2.githubusercontent.com/u/31616?v=4" width="100px;"/><br /><sub><b>Nick Sellen</b></sub>](http://nicksellen.co.uk)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=nicksellen "Code") [📖](https://github.com/yunity/karrot-frontend/commits?author=nicksellen "Documentation") [🚇](#infra-nicksellen "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-nicksellen "Reviewed Pull Requests") [⚠️](https://github.com/yunity/karrot-frontend/commits?author=nicksellen "Tests") | [<img src="https://avatars0.githubusercontent.com/u/17573771?v=4" width="100px;"/><br /><sub><b>Janina Abels</b></sub>](https://github.com/djahnie)<br />[🤔](#ideas-djahnie "Ideas, Planning, & Feedback") [🐛](https://github.com/yunity/karrot-frontend/issues?q=author%3Adjahnie "Bug reports") [💬](#question-djahnie "Answering Questions") [💻](https://github.com/yunity/karrot-frontend/commits?author=djahnie "Code") [🌍](#translation-djahnie "Translation") | [<img src="https://avatars0.githubusercontent.com/u/16825880?v=4" width="100px;"/><br /><sub><b>D0nPiano</b></sub>](https://github.com/D0nPiano)<br />[🎨](#design-D0nPiano "Design") [💻](https://github.com/yunity/karrot-frontend/commits?author=D0nPiano "Code") [🤔](#ideas-D0nPiano "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/16634824?v=4" width="100px;"/><br /><sub><b>Lukas Gebhard</b></sub>](https://github.com/mr-kojo)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=mr-kojo "Code") [🤔](#ideas-mr-kojo "Ideas, Planning, & Feedback") [👀](#review-mr-kojo "Reviewed Pull Requests") [📖](https://github.com/yunity/karrot-frontend/commits?author=mr-kojo "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/7449720?v=4" width="100px;"/><br /><sub><b>mrkvon</b></sub>](https://mrkvon.org)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=mrkvon "Code") [🤔](#ideas-mrkvon "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/22643479?v=4" width="100px;"/><br /><sub><b>taistadam</b></sub>](https://github.com/taistadam)<br />[📝](#blog-taistadam "Blogposts") [💻](https://github.com/yunity/karrot-frontend/commits?author=taistadam "Code") [🎨](#design-taistadam "Design") [🤔](#ideas-taistadam "Ideas, Planning, & Feedback") [🌍](#translation-taistadam "Translation") | [<img src="https://avatars2.githubusercontent.com/u/25362020?v=4" width="100px;"/><br /><sub><b>Ines Dorian Gütt</b></sub>](http://danke.fish)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=id-gue "Code") [📖](https://github.com/yunity/karrot-frontend/commits?author=id-gue "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/18111928?v=4" width="100px;"/><br /><sub><b>Marie Dedikova</b></sub>](https://github.com/mddemarie)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=mddemarie "Code") [📖](https://github.com/yunity/karrot-frontend/commits?author=mddemarie "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/10246027?v=4" width="100px;"/><br /><sub><b>Andreas Langecker</b></sub>](https://gitlab.com/alangecker)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=alangecker "Code") [🎨](#design-alangecker "Design") [🤔](#ideas-alangecker "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/19744774?v=4" width="100px;"/><br /><sub><b>djembejohn</b></sub>](https://github.com/djembejohn)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=djembejohn "Code") [🤔](#ideas-djembejohn "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/861660?v=4" width="100px;"/><br /><sub><b>Matthias Larisch</b></sub>](https://github.com/NerdyProjects)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=NerdyProjects "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/576949?v=4" width="100px;"/><br /><sub><b>pogopaule</b></sub>](https://github.com/pogopaule)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=pogopaule "Code") [🤔](#ideas-pogopaule "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/16507629?v=4" width="100px;"/><br /><sub><b>Thiago Mendes</b></sub>](https://tmendes.gitlab.io/38lbackpack)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=trmendes "Code") [🌍](#translation-trmendes "Translation") | [<img src="https://avatars3.githubusercontent.com/u/18754163?v=4" width="100px;"/><br /><sub><b>Xaph</b></sub>](https://github.com/LyraXaph)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=LyraXaph "Code") | [<img src="https://avatars1.githubusercontent.com/u/1991377?v=4" width="100px;"/><br /><sub><b>lwm</b></sub>](https://github.com/lwm)<br />[💻](https://github.com/yunity/karrot-frontend/commits?author=lwm "Code") | [<img src="https://avatars2.githubusercontent.com/u/9918263?v=4" width="100px;"/><br /><sub><b>Bruno MC</b></sub>](https://github.com/brunomc)<br />[🐛](https://github.com/yunity/karrot-frontend/issues?q=author%3Abrunomc "Bug reports") [🔍](#fundingFinding-brunomc "Funding Finding") [🤔](#ideas-brunomc "Ideas, Planning, & Feedback") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

# Attribution

_Karrot_ is built with open-source software. Here are some of them:

- [Django](https://www.djangoproject.com/)
- [Django REST framework](http://www.django-rest-framework.org/)
- [VueJS](https://vuejs.org/) + [Vuex](https://vuex.vuejs.org)
- [Quasar Framework](http://quasar.dev/)
- [Twemoji](https://github.com/twitter/twemoji)

