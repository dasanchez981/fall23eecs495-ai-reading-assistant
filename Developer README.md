Follow these instructions to set up project as developer:

1) Create .env file so that your extension can use the Open AI API key
```cd ./ai-reading-assistant```
```echo "VITE_OPENAI_API_KEY=" > .env```

2) Put in your Open AI API key in your .env file as the value of the "VITE_OPENAI_API_KEY=" 
"VITE_AWS_REGION="
"VITE_AWS_IDENTITY_POOL_ID="

3) To create "dist" folder that will be used for chrome extension:
```cd ./ai-reading-assistant```
```npm install```
```npm install openai@^4.0.0```
```npm install react-text-selection-popover```
```npm install react-h5-audio-player```
```npm install @aws-sdk/client-cognito-identity``
```npm install @aws-sdk/credential-provider-cognito-identity```
```npm install @aws-sdk/client-polly```
```npm install @aws-sdk/polly-request-presigner```
```npm install --save @types/chrome```
```npm install react-bootstrap bootstrap```
```npm run build```