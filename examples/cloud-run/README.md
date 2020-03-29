# Cloud Run example

## Prepare

1. Download cargo-make

Linux:

```shellsession
export CARGO_MAKE_VERSION="0.29.0" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl.zip \
| busybox unzip -p - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl/cargo-make > bin/cargo-make && chmod a+x bin/cargo-make
```

macOS:

```shellsession
export CARGO_MAKE_VERSION="0.29.0" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin.zip \
| bsdtar --strip-components 1 -C bin/ -xvf - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin/cargo-make
```

2. Set up the project via cargo-make you downloaded.

```shellsession
bin/cargo-make make --makefile tasks/setup-project.toml
```

## Development

```shellsession
docker-compose up app
```

## Provisioning

```shellsession
docker-compose up provisioning
```

```shellsession
bin/cargo-make make --makefile tasks/build-and-push-image.toml
```

```shellsession
docker-compose run provisioning terraform apply
```

e.g. `https://${PROJECT_UNIQUE_ID}-redirector-${RANDOM}-uc.a.run.app`

```shellsession
❯ curl -LI https://****-redirector-****-uc.a.run.app
HTTP/1.1 301 Moved Permanently
x-powered-by: Express
location: http://brand-new.example.com/news/we-have-moved
vary: Accept
content-type: text/plain; charset=utf-8
X-Cloud-Trace-Context: 6a4afe493752e677550228fe7dddfcd9;o=1
Date: Mon, 23 Mar 2020 21:38:17 GMT
Server: Google Frontend
Transfer-Encoding: chunked
Alt-Svc: quic=":443"; ma=2592000; v="46,43",h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,h3-T050=":443"; ma=2592000

curl: (6) Couldn't resolve host 'brand-new.example.com'
```
