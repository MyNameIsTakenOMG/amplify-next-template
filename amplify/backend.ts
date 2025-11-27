import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import {
  AttributeType,
  GlobalSecondaryIndexPropsV2,
  ProjectionType,
  StreamViewType,
  TableV2,
} from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LoggingFormat } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

let backend = defineBackend({
  // auth,
  // data,
});
const dbStack = backend.createStack('db-stack');
const myTable = new TableV2(dbStack, 'dentabook2-db-table', {
  partitionKey: {
    name: 'pk',
    type: AttributeType.STRING,
  },
  removalPolicy: RemovalPolicy.DESTROY,
});
const mytestChange = new NodejsFunction(dbStack, 'my-test-change', {
  functionName: 'my-test-change',
  handler: 'index.handler',
  loggingFormat: LoggingFormat.JSON,
  logGroup: new LogGroup(dbStack, 'my-test-change-log', {
    retention: RetentionDays.ONE_DAY,
    removalPolicy: RemovalPolicy.DESTROY,
  }),
  initialPolicy: [
    new PolicyStatement({
      actions: ['cloudformation:*'],
      resources: ['*'],
    }),
  ],
  environment: {
    TABLE_NAME: myTable.tableName,
    STACK_NAME: dbStack.stackName,
  },
  entry: './amplify/functions/mytestChange.ts',
});
