1. The database lives in the directory 'data'
2. There is a local script to start the mongo server type "./mongod" - this will start the server w/o journalling to fit in the space given us by Cloud9.
3. The package.json file exists to set up and describe the environment - it loads the dependencies so that we can use npm -install to automatically update everything.
4. Mongo to run the mongodb shell
5. Authentication - when we add it look into "stormpath" or the "passport plugin" which authenticates through social media accounts.
6. Curl command is useful for testing.  It can send html (put and get etc) requests to the server
7. Currrently I'd like to  evaluate restify which helps create a RESTful nodejs server (http://mcavage.me/node-restify/)
8. Look into taking https connections.
10. used youtube video:  "Develop Complete REST service app using pure Node.js"
11. Need to understand how the queries are formatted from the client end. -- how do we convert them to a json doc?
    Partial answer : the post request somehow has a "body" element and a type of JSON(application/json)
    example:  curl -d '{"auth":{"passwordCredentials":{"username": "admin","password": "secret"},"tenantName": "customer-A"}}' -H "Content-Type: \ application/json" http://192.168.100.100:5000/v2.0/tokens
12. When do we use the -H in curl to send the header information?  How is it useful
13. Try...Catch doesn't seem to percolate up a try...catch in handler, did not catch an exception in handle put.  Why?
14. Mongo  output shows 6 connections when server is started.  Where do these come from?
15. 
Moving files to github:
    First make the repository (Name=RepositoryName) on github.
    Open the terminal and make the new directory (mkdir NewDirectory).
    Copy your ProjectFolder to this NewDirectory.
    Change the present work directory to NewDirectory.
    Run these commands
    git init
    git add ProjectFolderName
    git commit -m "first commit"
    git remote add origin https://github.com/YourGithubUsername/RepositoryName.git
    git push -u origin master
