import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // Note: for manual invocation, just re-call the function

  console.log('event: ');
  console.log(event);
  console.log('table name: ');
  console.log(process.env.TABLE_NAME);
};
