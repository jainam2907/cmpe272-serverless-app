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

In this stage of the application, the serverless framework uses AWS Cloudformation to deploy the necessary AWS resources based on the configuration in `serverless.yaml`. After the serverless deployment, the application is hosted in the AWS environment and is available for public use.


## Running Locally

To run the application locally (in `offline` stage), use the following command:

```bash
npm run start
```

This will first start DynamoDB on `http://localhost:8000` and then start serverless offline to simulate API Gateway and Lambda functions on `http://localhost:3000`.

<img width="906" alt="Screenshot 2024-09-11 at 5 16 35 PM" src="https://github.com/user-attachments/assets/f0cf08e7-2287-48cc-83e3-f017e84d74bc">


### Local Endpoints

You can access the following endpoints in local development:

- POST http://localhost:3000/offline/students: Create a new student record.
- GET http://localhost:3000/offline/students?student_id=123: Retrieve a student record by `student_id`.

Example POST request using Postman:
<img width="1582" alt="Screenshot 2024-09-11 at 8 07 09 PM" src="https://github.com/user-attachments/assets/cccba3c5-05fb-40fb-8440-e8b61af358f6">


Example GET request using Postman:
<img width="1582" alt="Screenshot 2024-09-11 at 8 08 25 PM" src="https://github.com/user-attachments/assets/20c23c4d-d146-44cd-87e6-b6867bda204d">


## Deploying to AWS

To deploy the application to AWS (in `dev` stage), use the following command:

```bash
npm run deploy
```

This will deploy the entire stack (Lambda function, API Gateway and DynamoDB) to AWS.

<img width="906" alt="Screenshot 2024-09-11 at 5 22 16 PM" src="https://github.com/user-attachments/assets/6ca7abef-b81e-4cef-afbd-02727ed46138">




### AWS Endpoints

Once deployed, the API Gateway will provide URLs. You can access the student API using Postman/cURL.

Example POST request:
<img width="1582" alt="Screenshot 2024-09-11 at 8 13 57 PM" src="https://github.com/user-attachments/assets/c6976354-7037-4820-8614-ad541de6e60a">

Example GET request:
<img width="1582" alt="Screenshot 2024-09-11 at 8 13 44 PM" src="https://github.com/user-attachments/assets/c7b7dac7-adf8-4075-aedd-262639c59b30">


Sample records in the DynamoDB table:
<img width="1582" alt="Screenshot 2024-09-11 at 8 17 43 PM" src="https://github.com/user-attachments/assets/2ad5484f-e7fc-4104-bbf0-a809b90a4ac9">


Reflection:
Since I had already worked with AWS Lambda before, I knew the basics of how that works. So, I decided to add more challenge to it by using serverless framework. I learned a lot while figuring out what goes into the serverless.yaml config file to make it work both locally and in production. I felt this was a crucial thing for me to learn as this was I also got to test my changes locally with the serverless offline plugin. 

Apart from this, other errors I had to debug were related to permissions. Initially, the lambda role didn't have enough permissions to work with the DynamoDB table. Here, the AWS documentation around policies came in handy.
