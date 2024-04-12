# fall23eecs495-ai-reading-assistant

## Welcome! 

This is an open source project building off work started by the team for the capstone class EECS 495: Software for Accessibility at the University of Michigan. Please contact 495-ai-reading-assistant@umich.edu via email if there are any questions/issues regarding the instructions below!

### Chrome Extension Setup

1) Clone the GitHub repository to your local machine
``` bash
git@github.com:dasanchez981/fall23eecs495-ai-reading-assistant.git
```

2) Navigate to the /ai-reading-assistant folder and install the needed node modules
``` bash
cd ai-reading-assistant
npm install
```

3) Build the extension locally by running the following command:
```bash
npm run build
```

4) Go to your Chrome Web Browser and navigate to chrome://extensions

![step4](doc/step3.5.png)

5) Toggle "Developer mode" ON in top right hand corner of page

6) Click "Load unpacked" button in top left hand corner of page

![step5-6](doc/step4.png)

7) Select the "dist" folder at /ai-reading-assistant/dist in the repository

10) Now you should see "AI-Reading-Assistant" as one of your extensions

11) Click on puzzle piece in the top right hand corner of browser window and pin the extension

![step9](doc/step6.png)

12) Click on the 'SidePanel' icon at the top right of your browser toolbar

![step10](doc/step7.png)

13) Click on the 'SidePanel' dropdown and select the extension

![step11](doc/step8.png)

14) Now the extension should be loaded into your browser. Enjoy!
