## Collab-Enhanced Ecommerce Backend API  
---   
**please note:**  package.json 'start' script has to be **`node server.js`** for production build.
Render hosting requires a production build, we can't use **`nodemon`** as that's a dev build tool.

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
5. 