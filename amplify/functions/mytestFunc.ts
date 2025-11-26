import { Handler } from 'aws-lambda';
import {
  CloudFormationClient,
  GetTemplateCommand,
} from '@aws-sdk/client-cloudformation';

const cfnClient = new CloudFormationClient();

export const handler: Handler = async (event, context) => {
  // Note: for manual invocation, just re-call the function

  console.log('event: ');
  console.log(event);
  console.log('table name: ');
  console.log(process.env.TABLE_NAME);

  const response = await cfnClient.send(
    new GetTemplateCommand({
      StackName: process.env.DB_CFN_TEMPLATE,
    })
  );
  console.log('the template: ');
  console.log(response.TemplateBody);
};
