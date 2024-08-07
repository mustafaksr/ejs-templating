# ejs-templating
 

## Steps to test locally with node.js:

1. : 
```bash
cd ~/ejs-templating
```
2. :
```bash
npm init -y
```


3. :
```bash
sudo npm install -g nodemon
npm i express ejs
```

4. :
 
```
nodemon index.js
```


## Docker Image Create:
```bash
git clone https://github.com/mustafaksr/ejs-templating.git
cd ejs-templating
docker build -t ejstemplating:latest .
docker run -p 3000:$PORT -e PORT=$PORT ejstemplating:latest # test container
# Ctrl + C if container run properly.
docker -t ejstemplating:latest your-docker-hub-username/ejstemplating:latest
docker your-docker-hub-username/ejstemplating:latest
```

## Docker Image Pull adn Run Container
```bash
docker pull mustafakeser/ejstemplating:latest # or your-docker-hub-username/ejstemplating:latest
export PORT=3000
docker run -p 3000:$PORT -e PORT=$PORT mustafakeser/ejstemplating:latest # or docker run -p 3000:$PORT -e PORT=$PORT  your-docker-hub-username/ejstemplating:latest
# visit http://localhost:3000
```
