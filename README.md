# What's new
- version 1.2.1: Updated readme. 
- version 1.2.0: Updated Node runtime to 16.x
# LambdaEdgeRemoveTrailingSlash

A Lambda@Edge function to remove trailing slashes from requests received by your CloudFront distribution. 

Designed to assist hosting static websites via S3, ensuring requests to /some/object-identifer/ are resolved to /some/object-identifier correctly

Available on the [AWS Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/us-east-1/951661612909/LambdaEdgeRemoveTrailingSlash)

## How to find this function in the AWS Serverless Repository

1. Visit AWS Lambda Console
1. Choose 'Create Function'
1. Choose 'Browse serverless app repository'
1. Search for 'LambdaEdgeRemoveTrailingSlash'
1. Tick the checkbox to 'Show apps that create custom IAM roles or resource policies'
1. This application will appear in the search results
1. Click the application box to view the application

## Installation Steps (AWS Console)

Installation of this function comprises two stages; Installing the application via the Serverless Repository and CloudFront, then configuring and deploying the Lambda@Edge function.

#### Building the CloudFormation Stack and Lambda Application
1. Ensure your console is currently viewing US-East-1 (N. Virginia) - All Lambda@Edge functions must be deployed in this region, see [lambda at edge how it works](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-how-it-works.html)
1. Visit this application on the AWS Serverless Repository (as above) 
1. Review the SAM Template, Permissions and License as appropriate
1. In the 'Application settings' box, choose a CloudFormation Stack name for this application 
1. Tick the box to 'acknowledge that this app creates custom IAM roles' (see below for details of the IAM Role)
1. Click 'Deploy'

AWS will now build a CloudFormation Stack, a Lambda Application and create a new Lambda Function.

#### Deploying to CloudFront
1. Visit your Lambda functions list in US-East-1 (N. Virginia)
1. You'll see the new function that was created by CloudFormation
1. Click into the function to edit it
1. Choose 'Actions' from the buttons at the top of the console
1. Choose 'Deploy to Lambda@Edge'
1. Now choose the CloudFront distribution that you wish to apply the function to. Commonly in Static S3/CloudFront website deployments you would have a www and non-www distribution with one redirecting to the other. Choose the distribution which is the final source of your website.
1. Change the 'CloudFront Event' setting to 'Viewer request'
1. All other settings remain as default
1. Tick the 'Confirm deploy' acknowledgement
1. Click 'Deploy'

AWS will now deploy the Lambda@Edge function to all Edge locations for your chosen CloudFront distribution. This may take a few minutes.

Once deployed, visit your website. You will find that `https://{your-website.com}/path/` redirects as HTTP 301 to `https://{your-website.com}/path` (without the trailing slash)


## Notes on IAM role creation

This application creates an IAM Role for the Lambda function. The IAM Role uses only standard AWS resources, namely:

* `arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole` - to give the Lambda function basic execution permissions
* A Trust Relationship with edgelambda.amazonaws.com - to allow publishing of the Lambda function as Lambda@Edge

## Questions / support

If you'd like to reach out to us with any questions you can find our details at [sinovi.uk/contact](https://sinovi.uk/contact)

## License

[MIT License](https://github.com/sinovi/lambda-edge-remove-trailing-slash/blob/master/LICENSE)
