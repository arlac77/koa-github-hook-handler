import test from "ava";
import got from "got";
import { createGiteaHookHandler } from "../src/hook-handler.mjs";

import { secret, path, createHookServer } from "./util.mjs";

let port = 3155;

test.before(async t => {
  port++;

  t.context.port = port;
  t.context.url = `http://localhost:${port}/${path}`;

  const payload = {};

  t.context.payload = payload;
  t.context.server = createHookServer(
    {
      push: async request => {
        payload.ref = request.ref;
        return { ok: true };
      }
    },
    port,
    createGiteaHookHandler
  );
});

test.after.always(async t => {
  t.context.server.close();
  t.context.server.unref();
});

test("gitea push", async t => {
  const response = await got.post(t.context.url, {
    headers: {
      "content-type": "application/json",
      "X-GitHub-Delivery": "2c61f3cb-aab8-4a5b-bc81-7e964f5209d4",
      "X-GitHub-Event": "push",
      "X-Gitea-Delivery": "2c61f3cb-aab8-4a5b-bc81-7e964f5209d4",
      "X-Gitea-Event": "push",
      "X-Gogs-Delivery": "2c61f3cb-aab8-4a5b-bc81-7e964f5209d4",
      "X-Gogs-Event": "push"
    },
    body: giteaPushBody
  });

  t.is(response.statusCode, 200);
  t.deepEqual(JSON.parse(response.body), { ok: true });

  t.is(t.context.payload.ref, "refs/heads/master");
});

const giteaPushBody = JSON.stringify({
  secret: secret,
  ref: "refs/heads/master",
  before: "32d15dcc85bae9e1305d4cca8273bc503caa4ee6",
  after: "32d15dcc85bae9e1305d4cca8273bc503caa4ee6",
  compare_url: "",
  commits: [
    {
      id: "32d15dcc85bae9e1305d4cca8273bc503caa4ee6",
      message: "fix: focus Software Delivery Pipelines",
      url:
        "https://mfelten.dynv6.net/services/git/markus/de.mfelten.profile/commit/32d15dcc85bae9e1305d4cca8273bc503caa4ee6",
      author: {
        name: "Markus Felten",
        email: "Markus.Felten@gmx.de",
        username: ""
      },
      committer: {
        name: "Markus Felten",
        email: "Markus.Felten@gmx.de",
        username: ""
      },
      verification: null,
      timestamp: "0001-01-01T00:00:00Z"
    }
  ],
  repository: {
    id: 3,
    owner: {
      id: 1,
      login: "markus",
      full_name: "Markus Felten",
      email: "markus.felten@gmx.de",
      avatar_url:
        "https://mfelten.dynv6.net/services/git/avatars/de9573e5d207b9078f1b70008df608d7",
      language: "de-DE",
      username: "markus"
    },
    name: "de.mfelten.profile",
    full_name: "markus/de.mfelten.profile",
    description: "",
    empty: false,
    private: false,
    fork: false,
    parent: null,
    mirror: false,
    size: 174,
    html_url:
      "https://mfelten.dynv6.net/services/git/markus/de.mfelten.profile",
    ssh_url: "git@mfelten.dynv6.net:markus/de.mfelten.profile.git",
    clone_url:
      "https://mfelten.dynv6.net/services/git/markus/de.mfelten.profile.git",
    website: "",
    stars_count: 0,
    forks_count: 0,
    watchers_count: 1,
    open_issues_count: 0,
    default_branch: "master",
    archived: false,
    created_at: "2018-08-08T14:06:14+02:00",
    updated_at: "2019-04-26T08:19:25+02:00",
    permissions: {
      admin: false,
      push: false,
      pull: false
    }
  },
  pusher: {
    id: 1,
    login: "markus",
    full_name: "Markus Felten",
    email: "markus.felten@gmx.de",
    avatar_url:
      "https://mfelten.dynv6.net/services/git/avatars/de9573e5d207b9078f1b70008df608d7",
    language: "de-DE",
    username: "markus"
  },
  sender: {
    id: 1,
    login: "markus",
    full_name: "Markus Felten",
    email: "markus.felten@gmx.de",
    avatar_url:
      "https://mfelten.dynv6.net/services/git/avatars/de9573e5d207b9078f1b70008df608d7",
    language: "de-DE",
    username: "markus"
  }
});
