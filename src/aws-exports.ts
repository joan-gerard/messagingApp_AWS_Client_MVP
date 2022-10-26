const awsConfig = {
  aws_project_region: "eu-central-1",
  aws_cognito_region: "eu-central-1",
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
};

export default awsConfig;
