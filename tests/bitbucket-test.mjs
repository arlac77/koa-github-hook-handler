import test from "ava";
import got from "got";
import { createBitbucketHookHandler } from "../src/hook-handler.mjs";

import { path, createHookServer } from "./helpers/util.mjs";

let port = 3156;

test.before(async t => {
  port++;

  t.context.port = port;
  t.context.url = `http://localhost:${port}/${path}`;

  const payload = {};

  t.context.payload = payload;
  t.context.server = createHookServer(
    {
      "repo:push": async request => {
        payload.repository = request.repository;
        return { ok: true };
      }
    },
    port,
    createBitbucketHookHandler
  );
});

test.after.always(async t => {
  t.context.server.close();
  t.context.server.unref();
});

test("bitbucket push", async t => {
  const response = await got.post(t.context.url, {
    headers: {
      "X-Request-UUID": "e7a1daa7-a80d-4353-8c9b-32f728d89086",
      "X-Event-Key": "repo:push",
      "X-Event-Time": "Thu, 18 Jul 2019 16:34:53 GMT",
      "X-Attempt-Number": "1",
      "X-Hook-UUID": "79492efb-32b4-4f69-a469-606b58d2f8b5",
      "User-Agent": "Bitbucket-Webhooks/2.0",
      "Content-Type": "application/json"
    },
    body: bitbucketPushBody
  });

  t.is(response.statusCode, 200);
  t.deepEqual(JSON.parse(response.body), { ok: true });

  t.is(t.context.payload.repository.name, "npm-package-template");
});

const bitbucketPushBody = JSON.stringify({
  push: {
    changes: [
      {
        forced: false,
        old: {
          name: "master",
          links: {
            commits: {
              href:
                "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commits/master"
            },
            self: {
              href:
                "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/refs/branches/master"
            },
            html: {
              href:
                "https://bitbucket.org/arlac77/npm-package-template/branch/master"
            }
          },
          default_merge_strategy: "merge_commit",
          merge_strategies: ["merge_commit", "squash", "fast_forward"],
          type: "branch",
          target: {
            rendered: {},
            hash: "c8a213d74c5864c3ee208a3829eb343a492a47fd",
            links: {
              self: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/c8a213d74c5864c3ee208a3829eb343a492a47fd"
              },
              html: {
                href:
                  "https://bitbucket.org/arlac77/npm-package-template/commits/c8a213d74c5864c3ee208a3829eb343a492a47fd"
              }
            },
            author: {
              raw: "Markus Felten <Markus.Felten@gmx.de>",
              type: "author",
              user: {
                display_name: "Markus Felten",
                account_id: "557058:3207ad5e-ea3d-432e-83c5-c31e30124f58",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/users/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D/"
                  },
                  avatar: {
                    href:
                      "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MF-6.png"
                  }
                },
                nickname: "arlac77",
                type: "user",
                uuid: "{7eeeef8a-17ef-45be-996f-ea51387bc7b9}"
              }
            },
            summary: {
              raw: "chore(package): semantic-release@12.2.2\n",
              markup: "markdown",
              html: "<p>chore(package): semantic-release@12.2.2</p>",
              type: "rendered"
            },
            parents: [
              {
                hash: "d6df50f161d272fcc7af59cc2270f83733788aaf",
                type: "commit",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/d6df50f161d272fcc7af59cc2270f83733788aaf"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/arlac77/npm-package-template/commits/d6df50f161d272fcc7af59cc2270f83733788aaf"
                  }
                }
              }
            ],
            date: "2018-01-13T23:43:11+00:00",
            message: "chore(package): semantic-release@12.2.2\n",
            type: "commit",
            properties: {}
          }
        },
        links: {
          commits: {
            href:
              "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commits?include=cb447e17dcaabb8a0ec2621f1c55d55fe3480a76&exclude=c8a213d74c5864c3ee208a3829eb343a492a47fd"
          },
          html: {
            href:
              "https://bitbucket.org/arlac77/npm-package-template/branches/compare/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76..c8a213d74c5864c3ee208a3829eb343a492a47fd"
          },
          diff: {
            href:
              "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/diff/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76..c8a213d74c5864c3ee208a3829eb343a492a47fd"
          }
        },
        created: false,
        commits: [
          {
            rendered: {},
            hash: "cb447e17dcaabb8a0ec2621f1c55d55fe3480a76",
            links: {
              self: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              },
              comments: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76/comments"
              },
              patch: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/patch/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              },
              html: {
                href:
                  "https://bitbucket.org/arlac77/npm-package-template/commits/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              },
              diff: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/diff/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              },
              approve: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76/approve"
              },
              statuses: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76/statuses"
              }
            },
            author: {
              raw: "Markus Felten <markus.felten@gmx.de>",
              type: "author",
              user: {
                display_name: "Markus Felten",
                account_id: "557058:3207ad5e-ea3d-432e-83c5-c31e30124f58",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/users/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D/"
                  },
                  avatar: {
                    href:
                      "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MF-6.png"
                  }
                },
                nickname: "arlac77",
                type: "user",
                uuid: "{7eeeef8a-17ef-45be-996f-ea51387bc7b9}"
              }
            },
            summary: {
              raw: "README.md edited online with Bitbucket",
              markup: "markdown",
              html: "<p>README.md edited online with Bitbucket</p>",
              type: "rendered"
            },
            parents: [
              {
                hash: "c8a213d74c5864c3ee208a3829eb343a492a47fd",
                type: "commit",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/c8a213d74c5864c3ee208a3829eb343a492a47fd"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/arlac77/npm-package-template/commits/c8a213d74c5864c3ee208a3829eb343a492a47fd"
                  }
                }
              }
            ],
            date: "2019-07-18T16:34:52+00:00",
            message: "README.md edited online with Bitbucket",
            type: "commit",
            properties: {}
          }
        ],
        truncated: false,
        closed: false,
        new: {
          name: "master",
          links: {
            commits: {
              href:
                "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commits/master"
            },
            self: {
              href:
                "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/refs/branches/master"
            },
            html: {
              href:
                "https://bitbucket.org/arlac77/npm-package-template/branch/master"
            }
          },
          default_merge_strategy: "merge_commit",
          merge_strategies: ["merge_commit", "squash", "fast_forward"],
          type: "branch",
          target: {
            rendered: {},
            hash: "cb447e17dcaabb8a0ec2621f1c55d55fe3480a76",
            links: {
              self: {
                href:
                  "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              },
              html: {
                href:
                  "https://bitbucket.org/arlac77/npm-package-template/commits/cb447e17dcaabb8a0ec2621f1c55d55fe3480a76"
              }
            },
            author: {
              raw: "Markus Felten <markus.felten@gmx.de>",
              type: "author",
              user: {
                display_name: "Markus Felten",
                account_id: "557058:3207ad5e-ea3d-432e-83c5-c31e30124f58",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/users/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D/"
                  },
                  avatar: {
                    href:
                      "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MF-6.png"
                  }
                },
                nickname: "arlac77",
                type: "user",
                uuid: "{7eeeef8a-17ef-45be-996f-ea51387bc7b9}"
              }
            },
            summary: {
              raw: "README.md edited online with Bitbucket",
              markup: "markdown",
              html: "<p>README.md edited online with Bitbucket</p>",
              type: "rendered"
            },
            parents: [
              {
                hash: "c8a213d74c5864c3ee208a3829eb343a492a47fd",
                type: "commit",
                links: {
                  self: {
                    href:
                      "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template/commit/c8a213d74c5864c3ee208a3829eb343a492a47fd"
                  },
                  html: {
                    href:
                      "https://bitbucket.org/arlac77/npm-package-template/commits/c8a213d74c5864c3ee208a3829eb343a492a47fd"
                  }
                }
              }
            ],
            date: "2019-07-18T16:34:52+00:00",
            message: "README.md edited online with Bitbucket",
            type: "commit",
            properties: {}
          }
        }
      }
    ]
  },
  actor: {
    display_name: "Markus Felten",
    account_id: "557058:3207ad5e-ea3d-432e-83c5-c31e30124f58",
    links: {
      self: {
        href:
          "https://api.bitbucket.org/2.0/users/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D"
      },
      html: {
        href:
          "https://bitbucket.org/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D/"
      },
      avatar: {
        href:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MF-6.png"
      }
    },
    nickname: "arlac77",
    type: "user",
    uuid: "{7eeeef8a-17ef-45be-996f-ea51387bc7b9}"
  },
  repository: {
    scm: "git",
    website: "",
    name: "npm-package-template",
    links: {
      self: {
        href:
          "https://api.bitbucket.org/2.0/repositories/arlac77/npm-package-template"
      },
      html: {
        href: "https://bitbucket.org/arlac77/npm-package-template"
      },
      avatar: {
        href:
          "https://bytebucket.org/ravatar/%7B36734289-3058-4c37-86ff-0ee8696d3d9d%7D?ts=js"
      }
    },
    full_name: "arlac77/npm-package-template",
    owner: {
      display_name: "Markus Felten",
      account_id: "557058:3207ad5e-ea3d-432e-83c5-c31e30124f58",
      links: {
        self: {
          href:
            "https://api.bitbucket.org/2.0/users/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D"
        },
        html: {
          href:
            "https://bitbucket.org/%7B7eeeef8a-17ef-45be-996f-ea51387bc7b9%7D/"
        },
        avatar: {
          href:
            "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MF-6.png"
        }
      },
      nickname: "arlac77",
      type: "user",
      uuid: "{7eeeef8a-17ef-45be-996f-ea51387bc7b9}"
    },
    type: "repository",
    is_private: false,
    uuid: "{36734289-3058-4c37-86ff-0ee8696d3d9d}"
  }
});
