# fall23eecs495-ai-reading-assistant

## EECS 495 Staff: Setup Instructions

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
6) Fill out the .env.tpl based on the API credentials provided via email
   
7) Rename the .env.tpl file to a .env file

8) Now install the npm packages needed for this project
```bash
npm install
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

6) Now you should see "AI-Reading-Assistant" as one of your extensions

7) Click on puzzle piece in the top right hand corner of browser window

8) Navigate and go to "AI Reading Assistant Extension" and select pin icon

9) Now you can see the extension and interact with it by clicking on its icon
