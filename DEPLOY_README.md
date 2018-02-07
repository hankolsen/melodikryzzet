## Mental notes for deploying to heroku/netlify

### Install requirements

Install heroku: _`brew install heroku/brew/heroku`_

Login to heroku: _`heroku login`_

Install netlify: _`npm install netlify-cli -g`_

### Heroku for the server

`cd server`

`heroku create`

`git subtree push --prefix server heroku master`

`heroku open`

`heroku logs --tail`

### Netlify for the client

Check the remote heroku path in .git/config, and make sure that the url is the same as in **client/.env.production**.

`cd client`

`yarn run build`

`netlify deploy`


