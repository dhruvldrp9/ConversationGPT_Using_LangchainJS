# ConversationGPT_Using_LangchainJS

## prerequisite
1 : Node.js installed
    Link : https://nodejs.org/en/download
    
2 : Docker and Docker Desktop Installed
    Link : https://docs.docker.com/get-docker/
    
3 : OpenAI_API_KEY Require
    Link : https://platform.openai.com/api-keys
    
4 : SerpAPI_KEY Require
    Link : https://serpapi.com/manage-api-key

## Installation Process
1 : Open first terminal and change working directory to project folder

2 : Run - git clone https://github.com/dhruvldrp9/ConversationGPT_Using_LangchainJS.git

3 : Change working directory to 'ConversationGPT_Using_LangchainJS' folder

4 : Run - npm install

5 : In app.js folder enter your 'OpenAI_API_KEY' and 'SerpAPI_KEY' at  const Open = "Enter_Your_OpenAI_API_Key"; & const Serp = "Enter_Your_Serp_API_Key";

6 : Open second terminal(Don't Close first terminal)
    Run - docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
    Run - docker run -v /local-data/:/data redis/redis-stack-server:latest
    
7 : In first terminal
    Run - node app.js
8 : Open - http://localhost:3000/
