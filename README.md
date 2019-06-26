# lambda-edge-trailing-slash
A Lambda@Edge function to remove the trailing slash from requests


# Installing via AWS Serverless Application Repository

TBC

Once the Lambda function and associated role have been created, you need to complete the following manual steps:

1. Within AWS Console switch to the US-East-1 region (this is the region where Lamda@Edge functions must exist)
2. Find the function LambdaEdgeRemoveTrailingSlash and click on it to view details. 
3. Under Actions (top-right), click 'Deploy to Lamdba@Edge'
4. You will be presented with a screen to choose which CloudFront Distribution you would like to trigger the function
5. *Important* Set the CloudFront event to 'Viewer Request'