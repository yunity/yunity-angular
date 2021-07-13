/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

const { configure } = require('quasar/wrappers')
const { resolve } = require('path')
const fs = require('fs')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function getHttpsOptions () {
  /* Try to set up https with your own cert for usage with mkcert
  Define your cert path and filenames in a file called .env (this uses dotenv)

  KEY=key.pem
  CERT=cert.pem
  CA=/home/tic/.local/share/mkcert/rootCA.pem

  More info: https://github.com/FiloSottile/mkcert
  If these are not available, fall back to making our own cert
  */
  try {
    return {
      key: fs.readFileSync(process.env.KEY),
      cert: fs.readFileSync(process.env.CERT),
      ca: fs.readFileSync(process.env.CA),
    }
  }
  catch (e) {
    console.log('Could not find key/cert/ca files, falling back to our own...', e)
    return true
  }
}

module.exports = configure(function (ctx) {
  const { backend, proxyTable } = require('./build/config')
  const dev = ctx.dev

  const appEnv = {
    // define the karrot environment
    KARROT: {
      BACKEND: backend,
      THEME: process.env.KARROT_THEME,
      FCM_CONFIG: process.env.FCM_CONFIG,
      SENTRY_CONFIG: process.env.SENTRY_CONFIG,
      GIT_SHA1: process.env.GIT_SHA1 || process.env.CIRCLE_SHA1,
    },
    // vuelidate wants this
    // see https://github.com/monterail/vuelidate/issues/365
    BUILD: JSON.stringify('web'),
  }

  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/quasar-conf-js#property-htmlvariables
    htmlVariables: {
      title: 'Karrot - Start a group, become a community',
    },

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'loglevel',
      'pwa',
      'helloDeveloper',
      'addressbar-color',
      'socket',
      'sentry',
      'cordova',
      'i18n',
      'loadInitialData',
      'polyfill',
      'icons',
      'detectMobileKeyboard',
      'performance',
      'presenceReporter',
      'vuex-router-sync',
      'vueRoot',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.styl',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // disable vendor chunk
    vendor: {
      disable: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      env: appEnv,

      // https://quasar.dev/quasar-cli/handling-webpack
      chainWebpack (chain) {
        const imagesRule = chain.module.rule('images')
        // save loader options from quasar - returns an object like this:
        /*
        {
          esModule: false,
          limit: 10000,
          name: 'img/[name].[ext]',
        }
        */
        const imagesRuleOptions = imagesRule.uses.entries()['url-loader'].store.get('options')

        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        imagesRule.uses.clear()

        /* eslint-disable indent */
        imagesRule
          .oneOf('disableinline')
            .resourceQuery(/disableinline/)
            .use('url-loader')
              .loader('url-loader')
              .options({ ...imagesRuleOptions, limit: -1 })
              .end()
            .end()
          .oneOf('inline') // aka default from quasar
            .use('url-loader')
              .loader('url-loader')
              .options(imagesRuleOptions)
        /* eslint-enable indent */
      },

      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })

        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          '@': resolve(__dirname, './src'),
          '>': resolve(__dirname, './test'),
          variables: resolve(__dirname, './src/css/quasar.variables.styl'),
          editbox: resolve(__dirname, './src/css/karrot.editbox.styl'),
        }

        cfg.plugins.unshift(new StyleLintPlugin({
          files: ['./src/**/*.{vue,styl}'],
          customSyntax: resolve(__dirname, './build/stylelintCustomSyntax.js'),
        }))

        cfg.plugins.push(
          new PreloadWebpackPlugin({
            fileWhitelist: [/\.woff?$/],
            include: 'allAssets',
            rel: 'prefetch',
          }),
        )

        if (dev) {
          cfg.plugins.push(new HardSourceWebpackPlugin({
            configHash: function (webpackConfig) {
              return require('node-object-hash')({ sort: false }).hash([
                webpackConfig,
                appEnv,
              ])
            },
          }))
        }

        if (!dev) {
          cfg.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: ctx.mode.cordova ? 'disabled' : 'static',
            reportFilename: 'bundlesize.html',
            defaultSizes: 'gzip',
            openAnalyzer: false,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          }))
        }
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // PWA needs https to load the service worker
      https: (ctx.dev && ctx.mode.pwa) ? getHttpsOptions() : false,
      port: 8080,
      open: !process.env.NO_OPEN_BROWSER, // opens browser window automatically
      proxy: proxyTable,
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Dialog',
        'AppVisibility',
        'Notify',
        'AddressbarColor',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // All the paths that already have file hashes in them
        // other files will have a ?__WB_REVISION__=<revision> parameter added to them.
        // Some people say that in theory workbox can already detect the ones with the hash, but doesn't seem so.
        // if you want to see the entries in the cache you can put this in a service worker debugging console:
        //
        //     urls = (await (await caches.open((await caches.keys())[0])).keys()).map(e => e.url)
        //
        dontCacheBustURLsMatching: /^(css|js|img|fonts)\//,
        exclude: [
          // A partial solution to a more complex issue
          // See https://github.com/yunity/karrot-frontend/issues/2209
          'index.html',
        ],
      },
      manifest: {
        name: process.env.PWA_APP_NAME || 'Karrot local dev',
        short_name: process.env.PWA_APP_NAME || 'Karrot local dev',
        description: 'Modern website for organization of foodsaving groups worldwide',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#4a3520',
        icons: process.env.KARROT_THEME === 'dev'
          ? [
              {
                src: 'icons/dev.png',
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: 'icons/dev.svg',
              },
            ]
          : [
              {
                src: 'icons/icon-128x128.png',
                sizes: '128x128',
                type: 'image/png',
              },
              {
                src: 'icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: 'icons/icon-256x256.png',
                sizes: '256x256',
                type: 'image/png',
              },
              {
                src: 'icons/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
              },
              {
                src: 'icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
              },
            ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },
  }
})
