# Please fill in the environments variables for full functionality

# Get this from your OpenAI account and set up an API Key
# You will need to have some funds on your account to be able to make an API call
VITE_OPENAI_API_KEY=''

# The 2 environment variables below are generated using AWS
# Our team was able to generate these keys using this archived AWS document:
# https://web.archive.org/web/20230630130656/https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-browser.html
# NOTE: You need to go to the link above as the curent documentation has changed. Additionally,
#       these instructions do not correspond 1 for 1 with what exactly you 
#       need to do to generate these 2 API keys. We think that the document
#       is outdated and the AWS console UI was updated without the 
#       corresponding changes reflected in the document.
#       The most important thing is to create an "Amazon Cognito Identity Pool"
#       and then to "Add a Policy to the Created IAM Role" and the archived
#       document sufficiently captures the gist of those steps.

# Default is 'us-east-1' for neural voices
VITE_AWS_REGION=''

# See above. This is unique for every person
VITE_AWS_IDENTITY_POOL_ID=''
