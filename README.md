# ejs-templating
 

## Steps to test:

1. : 
```
cd ~/ejs-templating
```
2. :
```
npm init -y
```


3. :
```
sudo npm install -g nodemon
npm i express ejs
```

4. :
 
```
nodemon index.js
```


Docker image:
```
docker pull mustafakeser/ejstemplating:latest
export PORT=3000
docker run -p 80:$PORT -e PORT=$PORT mustafakeser/ejstemplating:latest
```
