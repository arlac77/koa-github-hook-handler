[![npm](https://img.shields.io/npm/v/koa-github-hook-handler.svg)](https://www.npmjs.com/package/koa-github-hook-handler)
[![License](https://img.shields.io/badge/License-0BSD-blue.svg)](https://spdx.org/licenses/0BSD.html)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=koa-github-hook-handler\&badge=detailed)](https://bundlejs.com/?q=koa-github-hook-handler)
[![downloads](http://img.shields.io/npm/dm/koa-github-hook-handler.svg?style=flat-square)](https://npmjs.org/package/koa-github-hook-handler)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/koa-github-hook-handler.svg?style=flat-square)](https://github.com/arlac77/koa-github-hook-handler/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fkoa-github-hook-handler%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/koa-github-hook-handler/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/koa-github-hook-handler/badge.svg)](https://snyk.io/test/github/arlac77/koa-github-hook-handler)
[![Coverage Status](https://coveralls.io/repos/arlac77/koa-github-hook-handler/badge.svg)](https://coveralls.io/github/arlac77/koa-github-hook-handler)

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

*   [Context](#context)
*   [KoaHandler](#koahandler)
    *   [Parameters](#parameters)
*   [WebhookHandler](#webhookhandler)
    *   [Parameters](#parameters-1)
*   [createGithubHookHandler](#creategithubhookhandler)
    *   [Parameters](#parameters-2)
*   [createGiteaHookHandler](#creategiteahookhandler)
    *   [Parameters](#parameters-3)
*   [createBitbucketHookHandler](#createbitbuckethookhandler)
    *   [Parameters](#parameters-4)

## Context

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

## KoaHandler

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `ctx` **[Context](#context)**&#x20;
*   `next` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)**&#x20;

## WebhookHandler

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `request` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** decoded request body
*   `event` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** from 'x-github-event' header
*   `ctx` **[Context](#context)** from koa

## createGithubHookHandler

Create a koa middleware suitable to bridge github webhook requests to KoaHandlers

### Parameters

*   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)

    *   `actions.default` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** default action
    *   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

## createGiteaHookHandler

Create a koa middleware suitable to bridge gitea webhook requests to KoaHandlers

### Parameters

*   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)

    *   `actions.default` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** default action
    *   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

## createBitbucketHookHandler

Create a koa middleware suitable to bridge gitea webhook requests to KoaHandlers

### Parameters

*   `actions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** holding all the handles for the events (event is the key)

    *   `actions.default` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** default action
    *   `actions.event` **[WebhookHandler](#webhookhandler)** (event is the key)
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `config.secret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to decode signature

Returns **[KoaHandler](#koahandler)** suitable as koa middleware

# install

With [npm](http://npmjs.org) do:

```shell
npm install koa-github-hook-handler
```

# license

BSD-2-Clause
