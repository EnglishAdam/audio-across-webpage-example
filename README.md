# Simple NodeJS/Fastify Audio Example

This repo is a simple JS example, to demonstrate to myself, the feasability of creating a Multiple Page application (MPA) that can track audio playing across several page loads. Single Page Application (SPA) have the advantage of maintaining a session across 'pages' via the use of 'routes'. With an MPA, this is not currently possible (&lt;portal&gt; may grant this) since each page navigation loads a new page resulting a small pause to the audio as the page changes.

The impetus to try this was to rethink/return-to web applications from the 'Progressive Enhancement' development position. SPA necessitate the use of client-side JavaScript, even if the initial webpage load is rendered on the server (SSR). Can I replicate feature sets with minimal JavaScript and no framework.

This repo is structured using ETA as the templating engine and Fastify as the Server framework.

You can find an online example hosted on a free Heroku dyno (You many need to wait 30secs for it to boot up) here: https://audio-across-webpage-example.herokuapp.com/

A PHP version of this can be found here: https://github.com/EnglishAdam/audio-across-webpage-php-example
