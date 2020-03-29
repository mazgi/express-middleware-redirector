# express-middleware-redirector

## How to configure

**minimum**

All requests are redirect to same path on `https://dest.example.com`.

e.g.

- `/` :arrow_forward: `https://dest.example.com/`
- `/path/to/content-a` :arrow_forward: `https://dest.example.com/path/to/content-a`
- ...

```json
{
  "destination": {
    "baseUrl": "https://dest.example.com"
  }
}
```

**More complex example**

- `/pages/about-us` :arrow_forward: `https://brand‐new.example.com/about`
- `/pages/access` and `/pages/office-location` :arrow_forward: `https://brand‐new.example.com/access`
- other all requests are redirect to `https://brand‐new.example.com/news/we-have-moved`

```json
{
  "destination": {
    "baseUrl": "https://brand‐new.example.com",
    "fallbackPath": "/news/we-have-moved"
  },
  "contentMappings": [
    {
      "fromPath": "/pages/about-us",
      "toPath": "/about"
    },
    {
      "fromPath": ["/pages/access", "/pages/office-location"],
      "toPath": "/access"
    }
  ]
}
```
