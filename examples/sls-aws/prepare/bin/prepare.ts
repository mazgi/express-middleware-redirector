#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PrepareStack } from '../lib/prepare-stack';

const app = new cdk.App();
new PrepareStack(app, 'PrepareStack');
