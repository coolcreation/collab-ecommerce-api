## Collab-Enhanced Ecommerce Backend API  
---
**please note:**  package.json 'start' script has to be **`node server.js`** for production build.  
Render hosting requires a production build, we can't use **`nodemon`** as that's a dev build tool.  
This following would be perfect and would still allow nodemon to run with `npm dev`:
```
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'Backend does not require a build step'",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```

light reading on this:  
https://community.render.com/t/nodemon-not-found-even-after-adding-it-as-a-dev-dependency/14419  

### How to use Render hosting and connect a repository  

 1. Go to https://render.com/ and sign up or log in.

 2. Connect the Repo:
 - On Render dashboard click the **`+New`** button.
 - Choose Web Service for a web app or API.
 - Under "Connect a Repository," paste in the GitHub repo address you want to use.
  
 3. Configure Render service
- `Name:` whatever you want the name to be, doesn't have to match repo name  
- `Language:` choose Node 
- `Branch:` choose main 
- `Region:` closest service to your location  
- `Build Command:` npm install
- `Start Command:` node server.js   (whatever js file runs your app, top of package.json)
- `Environment Variables:` include PORT and database URL connection string (.env contents)  
4. Click **`Deploy`** button and wait a couple minutes for it to build  
5. Go to Vercel hosting and make sure frontend hosting is using our current repo  
6. Vercel settings/environment-variables and paste in our API:  https://collab-ecommerce-api.onrender.com