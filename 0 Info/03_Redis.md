To change your Redis client connection from using a single password (via `process.env.RedisSecret`) to using a login
(username) and password, you need to use Redis ACL authentication introduced in Redis 6.

Your current code uses the URL format with just a password:

```js
url: `redis://:${process.env.RedisSecret}@${process.env.RedisHost}:${process.env.RedisPort}/${dbNumber}`,
```

### How to change to login + password

Redis ACL authentication requires specifying the username as well as the password in the connection URL. The format is:

```
redis://username:password@host:port/dbNumber
```

So you should update your code to:

```js
url: `redis://${process.env.RedisUser}:${process.env.RedisPassword}@${process.env.RedisHost}:${process.env.RedisPort}/${dbNumber}`,
```

Where:

- `process.env.RedisUser` is the Redis username (e.g., "default" or a custom ACL user)
- `process.env.RedisPassword` is the password for that user

### Additional notes

- Make sure your Redis server is configured with ACL users and passwords. You can create users with specific permissions in
  the Redis config or via the `ACL SETUSER` command.
- The legacy `requirepass` password only supports a single global password without username.
- Using username+password allows fine-grained access control per user[1][2].

This approach enables your client to authenticate with both login and password instead of just a password, aligning with
Redis 6+ ACL security features.

Citations: [1] https://redis.io/docs/latest/commands/auth/ [2]
https://redis.io/docs/latest/operate/oss_and_stack/management/security/ [3]
https://stackoverflow.com/questions/35745481/redis-cli-with-password [4]
https://www.w3resource.com/redis/redis-auth-password.php [5]
https://cyrisk.com/security/mitigation-instructions-for-redis-server-unprotected-by-password-authentication/ [6]
https://www.silicloud.com/blog/how-to-set-up-redis-login-authentication/ [7] https://techmonger.github.io/70/redis-password/
[8] https://codedamn.com/news/backend/redis-security-best-practices [9]
https://codezup.com/securing-redis-instance-authentication-authorization/

---

Answer from Perplexity:
https://www.perplexity.ai/search/what-is-difference-between-sec-aByZCgpwQWWwlY4fjk732Q?utm_source=copy_output
