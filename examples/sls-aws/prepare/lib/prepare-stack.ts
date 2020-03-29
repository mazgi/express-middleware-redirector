import * as cdk from '@aws-cdk/core'
import * as certmgr from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53'

const env = {
  baseDomainName: process.env.BASE_DOMAIN_NAME || 'example.com'
}

export class PrepareStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const hostedZone = new route53.PublicHostedZone(this, env.baseDomainName, {
      zoneName: env.baseDomainName
    })

    const certificate = new certmgr.DnsValidatedCertificate(
      this,
      `*.${env.baseDomainName}`,
      {
        hostedZone,
        domainName: env.baseDomainName,
        subjectAlternativeNames: [`*.${env.baseDomainName}`]
      }
    )
  }
}
