[![GitHub Issues](https://img.shields.io/github/issues/arlac77/koa-github-hook-handler.svg?style=flat-square)](https://github.com/arlac77/koa-github-hook-handler/issues)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![downloads](http://img.shields.io/npm/dm/koa-github-hook-handler.svg?style=flat-square)](https://npmjs.org/package/koa-github-hook-handler)
[![minified size](https://badgen.net/bundlephobia/min/koa-github-hook-handler)](https://bundlephobia.com/result?p=koa-github-hook-handler)
[![npm](https://img.shields.io/npm/v/koa-github-hook-handler.svg)](https://www.npmjs.com/package/koa-github-hook-handler)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/koa-github-hook-handler.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/koa-github-hook-handler)
[![Build Status](https://secure.travis-ci.org/arlac77/koa-github-hook-handler.png)](http://travis-ci.org/arlac77/koa-github-hook-handler)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/koa-github-hook-handler/badge.svg)](https://snyk.io/test/github/arlac77/koa-github-hook-handler)

## koa-github-hook-handler

handle github/gitea/bitbucket requests

<!-- skip-example -->

```js
import Koa from "koa";
import Router from "koa-better-router";
import { createGithubHookHandler } from "koa-github-hook-handler";

...

const router = Router();
const secret = "...";

router.addRoute(
  "POST",
  "/hook",
  createGithubHookHandler(
    {
      push: async request => {
        console.log("PUSH",request);
        return { ok: true };
      }
    },
    { secret }
  )
);
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [KoaHandler](#koahandler)
    -   [Parameters](#parameters)
-   [WebhookHandler](#webhookhandler)
    -   [Parameters](#parameters-1)
-   [createGithubHookHandler](#creategithubhookhandler)
    -   [Parameters](#parameters-2)
-   [createGiteaHookHandler](#creategiteahookhandler)
    -   [Parameters](#parameters-3)
-   [createBitbucketHookHandler](#createbitbuckethookhandler)
    -   [Parameters](#parameters-4)

## KoaHandler

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

-   `ctx` **Context** 
-   `next` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

## WebhookHandler

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

-   `request` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** decoded request body
-   `event` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from 'x-github-event' header
-   `ctx` **Context** from koa

## createGithubHookHandler

Create a koa middleware suitable to bridge github webhook requests to KoaHandlers

### Parameters

-   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)
    -   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

## createGiteaHookHandler

Create a koa middleware suitable to bridge gitea webhook requests to KoaHandlers

### Parameters

-   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)
    -   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

## createBitbucketHookHandler

Create a koa middleware suitable to bridge gitea webhook requests to KoaHandlers

### Parameters

-   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)
    -   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

# install

With [npm](http://npmjs.org) do:

```shell
npm install koa-github-hook-handler
```

# license

BSD-2-Clause
