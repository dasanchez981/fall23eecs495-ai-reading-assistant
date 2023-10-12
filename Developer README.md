Developer Setup Instructions:

### Local Machine

1) Clone the repository to your local machine

2) Ensure that NodeJS is installed on your local machine. Go [here](https://nodejs.org/en/download) for download instructions.

3) To ensure that Node Package Manager is successfully installed on your machine execute this command. This should return a version. 
```bash
npm -v
```
4) Now go to the repository and navigate to /ai-reading-assistant
```bash
cd ai-reading-assistant
```
5) Now open up the .env.tpl file, this is where all the API credentials will be stored
```bash
nano .env.tpl
```
6) Fill out the .env.tpl based on your API credentials
   
7) Rename the .env.tpl file to a .env file

8) Now install the npm packages needed for this project
```bash
npm install
```

Here is a list of npm packages that have been added throughout the development cycle:
```bash
cd ./ai-reading-assistant
npm install
npm install openai@^4.0.0
npm install react-text-selection-popover
npm install react-h5-audio-player
npm install @aws-sdk/client-cognito-identity
npm install @aws-sdk/credential-provider-cognito-identity
npm install @aws-sdk/client-polly
npm install @aws-sdk/polly-request-presigner
npm install --save @types/chrome
npm install react-bootstrap bootstrap
npm run build
```

9) Now build the project
```bash
npm run build
```
10) Ensure that a 'dist' folder exists at ai-reading-assistant/dist, this will be loaded into the browser

### Chrome Extension Setup

1) Open up Chrome Web Browser

2) Navigate to chrome://extensions

3) Toggle "Developer mode" ON in top right hand corner of page

4) Click "Load unpacked" button in top left hand corner of page

5) Navigate to the "dist" folder within the repository (/ai-reading-assistant/dist) and load it in

6) Now you should see "AI Reading Assistant Extension" as one of your extensions

7) Click on puzzle piece in the top right hand corner of browser window

8) Navigate and go to "AI Reading Assistant Extension" and select pin icon

9) Now you can see the extension and interact with it by clicking on its icon

