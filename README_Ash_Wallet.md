# Ash Wallet

## Install

```bash
yarn install
```

## Run

```bash
yarn workspace @safe-global/web start
```

## Refresh fork

```bash
git reset --soft HEAD~1
git stash
git pull
git stash pop
# resolve conflicts...
```

## Build & publish

```bash
docker build -f Dockerfile_static -t safeglobal/safe-wallet-web:$TAG .
docker tag safeglobal/safe-wallet-web:$TAG ghcr.io/ashavalanche/safeglobal/safe-wallet-web:$TAG
docker push ghcr.io/ashavalanche/safeglobal/safe-wallet-web:$TAG
```

## Upgrade

```bash
# in ash-team-infra

```
