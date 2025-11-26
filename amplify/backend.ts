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

defineBackend({
  // auth,
  // data,
});
const dbStack = backend.createStack('db-stack');
const myTable = new TableV2(stack, 'dentabook2-db-table', {
  partitionKey: {
    name: 'pk',
    type: AttributeType.STRING,
  },
  removalPolicy: RemovalPolicy.DESTROY,
});
