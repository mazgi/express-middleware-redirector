# Serverless Framework - AWS Lambda example

## Set up

Create `.env` file like below.

```
UID=1000 # Your UID
GID=100 # Your GID
AWS_ACCESS_KEY_ID=********
AWS_SECRET_ACCESS_KEY=********
BASE_DOMAIN_NAME=your-subdomain.example.com
```

If you using Linux.

```shellsession
echo "UID=$(id -u)" >> .env
echo "GID=$(id -g)" >> .env
```

## Provisioning & Deploy

```shellsession
docker-compose up
```

### Provision DNS & TLS Certificate

Register the DNS zone for your subdomain and request the certificate to ACM.

```shellsession
docker-compose run app bash -c 'cd prepare && npm run cdk:deploy'
```

You can show the name servers via the below commands.

```shellsession
aws route53 list-hosted-zones
aws route53 get-hosted-zone --id /hostedzone/Z********\
 | jq '.DelegationSet.NameServers'
```

You can show the certificate via the below command.

```shellsession
aws acm list-certificates
```

### Deploy the Application as a serverless application

(dev)

```shellsession
docker-compose run app npm run create_domain
```

```shellsession
docker-compose run app npm run deploy
```

(prod)

```shellsession
docker-compose run app npm run create_domain -- --stage prod
```

```shellsession
docker-compose run app npm run deploy -- --stage prod
```

### Delete the Application

```shellsession
docker-compose run app npm run remove
```

```shellsession
docker-compose run app npm run delete_domain
```

### Delete DNS & TLS Certificate

```shellsession
docker-compose run app bash -c 'cd prepare && npm run cdk:destroy'
```
