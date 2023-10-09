# fall23eecs495-ai-reading-assistant

## This is README for project

<h3>Helpful Instructions to Setup Chrome Extension Using the Code in this Repo</h3>

1) Create .env file so that your extension can use the Open AI API key
```cd ./ai-reading-assistant```
```echo "VITE_OPENAI_API_KEY=" > .env```

2) Put in your Open AI API key in your .env file as the value of the "VITE_OPENAI_API_KEY=" variable

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
```npm run build```

4) To load "dist" folder as a chrome extension:
go to url: chrome://extensions
or 
go to url: brave://extensions

5) Toggle "Developer mode" ON in top right hand corner of page

6) Click "Load unpacked" button in top left hand corner of page

7) Navigate to "dist" folder location on your local machine and select "dist" folder

8) Click on puzzle piece in the top right hand corner of browser window

9) Navigate and go to "AI Reading Assistant Extension" and select pin icon

10) Now you can see the extension and interact with the extension
