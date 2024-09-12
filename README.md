# Student Records API

As part of an assignment for CMPE272, this project implements a web application using AWS Lambda, API Gateway and Amazon DynamoDB to perform some of the basic CRUD operations on student records. The serverless framework is being used which allows the application to run locally for development/testing and also deploy to AWS for production use.

## Tools needed to run the project

Before beginning, ensure that the following tools are installed on your local machine:
1. Node.js
2. [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)
3. [AWS CLI](https://aws.amazon.com/cli/)
4. Git
5. Postman/cURL (for testing purpose)

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/jainam2907/cmpe272-serverless-app.git
cd cmpe272-serverless-app
```

### 2. Install dependencies:

```bash
npm install -g serverless 
npm install
```

This will install all necessary packages, including `serverless`, `serverless-offline`, and `serverless-dynamodb`.

## Configuration

The project supports two stages:

1. **Local development (offline)**:
   - Runs everything locally on `localhost`.
   - Simulates AWS services (API Gateway, DynamoDB) using `serverless-offline` and `DynamoDB Local`.

2. **Production (dev)**:
   - Deploys Lambda functions, API Gateway, and DynamoDB to AWS.
   - Allows the application to be accessible through a public URL.

## Stages

### 1. Local Development (offline)

For local development, the serverless framework uses serverless-offline plugin to create an environment like AWS locally, so that you can test the changes without having to deploy on AWS. The serverless-dynamodb plugin helps run DynamoDB locally.

- Serverless Offline: Simulates API Gateway and AWS Lambda on your local machine.
- Serverless Dynamo: Runs DynamoDB locally on `localhost:8000`.

### 2. AWS Production (dev)

In this stage of the application, the serverless framework uses AWS Cloudformation to deploy the necessary AWS resources based on the configuration in `serverless.yaml`. After the deployment done by serverless, the application is hosted on the AWS environment and is available for use publicly.


## Running Locally

To run the application locally (in `offline` stage), use the following command:

```bash
npm run start
```

This will first start DynamoDB on `http://localhost:8000` and then it will start serverless offline to simulate API Gateway and Lambda functinos on `http://localhost:3000`.


### Local Endpoints

You can access the following endpoints in local development:

- POST http://localhost:3000/offline/students: Create a new student record.
- GET http://localhost:3000/offline/students?student_id=123: Retrieve a student record by `student_id`.

Example POST request using Postman:


Example GET request using Postman:


## Deploying to AWS

To deploy the application to AWS (in `dev` stage), use the following command:

```bash
npm run deploy
```

This will deploy the entire stack (Lambda function, API Gatway and DynamoDB) to AWS.

### AWS Endpoints

Once deployed, the API Gateway will provide URLs. You can access using Postman/cURL to use the student api.

Example POST request:


Example GET request:


Sample records in the DynamoDB table:


Reflection:
