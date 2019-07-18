import test from "ava";
import got from "got";
import signer from "x-hub-signature/src/signer";
import {
  createGithubHookHandler,
} from "../src/hook-handler.mjs";

import { secret, path, createHookServer } from './util.mjs';

test("github push missing signature", async t => {
  let payload;
  const port = "3152";

  const server = createHookServer(
    {
      push: async (request, event) => {
        payload = request;
        return { ok: true };
      }
    },
    port,
    createGithubHookHandler
  );

  try {
    const response = await got.post(`http://localhost:${port}/${path}`, {
      headers: {
        "content-type": "application/json",
        "X-GitHub-Delivery": "7453c7ec-5fa2-11e9-9af1-60fccbf37b5b",
        "X-GitHub-Event": "push"
      },
      body: githubPushBody
    });
  } catch (e) {
    t.is(e.statusCode, 400);
  }

  server.close();
});

test("github push invalid signature", async t => {
  let payload;
  const port = "3153";

  const server = createHookServer(
    {
      push: async (request, event) => {
        payload = request;
        return { ok: true };
      }
    },
    port,
    createGithubHookHandler
  );

  try {
    const response = await got.post(`http://localhost:${port}/${path}`, {
      headers: {
        "X-Hub-Signature": "invalid",
        "content-type": "application/json",
        "X-GitHub-Delivery": "7453c7ec-5fa2-11e9-9af1-60fccbf37b5b",
        "X-GitHub-Event": "push"
      },
      body: githubPushBody
    });
  } catch (e) {
    //console.log(e);
    t.is(e.statusCode, 401);
  }

  server.close();
});

test("github push", async t => {
  let payload, event;
  const port = "3154";

  const server = createHookServer(
    {
      push: async (request, e) => {
        payload = request;
        event = e;
        return { ok: true };
      }
    },
    port,
    createGithubHookHandler
  );

  const sign = signer({ algorithm: "sha1", secret });
  const signature = sign(new Buffer(githubPushBody));

  const response = await got.post(`http://localhost:${port}/${path}`, {
    headers: {
      "X-Hub-Signature": signature,
      "content-type": "application/json",
      "X-GitHub-Delivery": "7453c7ec-5fa2-11e9-9af1-60fccbf37b5b",
      "X-GitHub-Event": "push"
    },
    body: githubPushBody
  });

  t.is(response.statusCode, 200);
  t.deepEqual(JSON.parse(response.body), { ok: true });

  t.is(event, "push");
  t.is(payload.ref, "refs/heads/template-sync-1");

  server.close();
});


const githubPushBody = JSON.stringify({
  ref: "refs/heads/template-sync-1",
  before: "0e19c5c2e158421ee2b2dfe0a70c29604b9d0cea",
  after: "0000000000000000000000000000000000000000",
  created: false,
  deleted: true,
  forced: false,
  base_ref: null,
  compare:
    "https://github.com/arlac77/npm-template-sync-github-hook/compare/0e19c5c2e158...000000000000",
  commits: [],
  head_commit: null,
  repository: {
    id: 113093573,
    node_id: "MDEwOlJlcG9zaXRvcnkxMTMwOTM1NzM=",
    name: "npm-template-sync-github-hook",
    full_name: "arlac77/npm-template-sync-github-hook",
    private: false,
    owner: {
      name: "arlac77",
      email: "Markus.Felten@gmx.de",
      login: "arlac77",
      id: 158862,
      node_id: "MDQ6VXNlcjE1ODg2Mg==",
      avatar_url: "https://avatars1.githubusercontent.com/u/158862?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/arlac77",
      html_url: "https://github.com/arlac77",
      followers_url: "https://api.github.com/users/arlac77/followers",
      following_url:
        "https://api.github.com/users/arlac77/following{/other_user}",
      gists_url: "https://api.github.com/users/arlac77/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/arlac77/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/arlac77/subscriptions",
      organizations_url: "https://api.github.com/users/arlac77/orgs",
      repos_url: "https://api.github.com/users/arlac77/repos",
      events_url: "https://api.github.com/users/arlac77/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/arlac77/received_events",
      type: "User",
      site_admin: false
    },
    html_url: "https://github.com/arlac77/npm-template-sync-github-hook",
    description: "github hook for npm-template-sync",
    fork: false,
    url: "https://github.com/arlac77/npm-template-sync-github-hook",
    forks_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/forks",
    keys_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/collaborators{/collaborator}",
    teams_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/teams",
    hooks_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/hooks",
    issue_events_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/issues/events{/number}",
    events_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/events",
    assignees_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/branches{/branch}",
    tags_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/tags",
    blobs_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/languages",
    stargazers_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/stargazers",
    contributors_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/contributors",
    subscribers_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/subscribers",
    subscription_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/subscription",
    commits_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/compare/{base}...{head}",
    merges_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/merges",
    archive_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/downloads",
    issues_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/labels{/name}",
    releases_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/arlac77/npm-template-sync-github-hook/deployments",
    created_at: 1512420666,
    updated_at: "2019-04-15T17:18:14Z",
    pushed_at: 1555348695,
    git_url: "git://github.com/arlac77/npm-template-sync-github-hook.git",
    ssh_url: "git@github.com:arlac77/npm-template-sync-github-hook.git",
    clone_url: "https://github.com/arlac77/npm-template-sync-github-hook.git",
    svn_url: "https://github.com/arlac77/npm-template-sync-github-hook",
    homepage: "",
    size: 368,
    stargazers_count: 0,
    watchers_count: 0,
    language: "JavaScript",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: {
      key: "bsd-2-clause",
      name: 'BSD 2-Clause "Simplified" License',
      spdx_id: "BSD-2-Clause",
      url: "https://api.github.com/licenses/bsd-2-clause",
      node_id: "MDc6TGljZW5zZTQ="
    },
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "master",
    stargazers: 0,
    master_branch: "master"
  },
  pusher: {
    name: "arlac77",
    email: "Markus.Felten@gmx.de"
  },
  sender: {
    login: "arlac77",
    id: 158862,
    node_id: "MDQ6VXNlcjE1ODg2Mg==",
    avatar_url: "https://avatars1.githubusercontent.com/u/158862?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/arlac77",
    html_url: "https://github.com/arlac77",
    followers_url: "https://api.github.com/users/arlac77/followers",
    following_url:
      "https://api.github.com/users/arlac77/following{/other_user}",
    gists_url: "https://api.github.com/users/arlac77/gists{/gist_id}",
    starred_url: "https://api.github.com/users/arlac77/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/arlac77/subscriptions",
    organizations_url: "https://api.github.com/users/arlac77/orgs",
    repos_url: "https://api.github.com/users/arlac77/repos",
    events_url: "https://api.github.com/users/arlac77/events{/privacy}",
    received_events_url: "https://api.github.com/users/arlac77/received_events",
    type: "User",
    site_admin: false
  }
});

