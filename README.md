# NodeJS RESTful API + Mongodb + Docker + Kubernetes


Ce projet contient un backend Node.js avec Express et une base de données MongoDB, le tout déployé avec Docker et Kubernetes.

## Prérequis
- Docker
- Docker Compose
- Kubernetes (kubectl)

## 1. Exécuter les conteneurs avec Docker Compose

Assurez-vous que Docker est en cours d'exécution, puis exécutez :
```
docker-compose up -d
```
Cela va lancer :
- Un conteneur MongoDB sur le port 27017

- Le backend Node.js sur le port 5001

## 2. Vérifier que MongoDB fonctionne

Vérifiez que MongoDB tourne correctement 
```
docker ps
```
Puis connectez-vous à MongoDB avec :

```
docker exec -it mongodb-container-name mongosh
```
Pour voir les bases de données :

```
show dbs
```
## 3. Accéder à l'API
Le backend écoute sur http://localhost:5001. Vous pouvez tester avec :
```
curl http://localhost:5001/api/products
```
 
## Gestion des erreurs
- "EADDRINUSE: address already in use" : Un autre service utilise déjà le port 5001. Changez le port dans docker-compose.yml ou arrêtez le processus en conflit.

+ "MongoNetworkError: failed to connect" : Assurez-vous que MongoDB tourne et que votre backend utilise la bonne URI MongoDB.

- "MongooseServerSelectionError" : Si vous utilisez MongoDB Atlas, vérifiez que votre adresse IP est bien whitelistée.

Accès à MongoDB avec Compass

## Pourquoi MongoDB Atlas bloque l'accès ?
MongoDB Atlas utilise une liste blanche d'IP pour sécuriser l'accès à la base de données. Seules les adresses IP figurant dans cette liste sont autorisées à se connecter.

Si votre adresse IP change (par exemple, si vous êtes sur un réseau Wi-Fi public, un VPN ou si votre FAI vous attribue une IP dynamique), MongoDB Atlas ne reconnaît plus votre IP et bloque la connexion.

## Comment résoudre ce problème ?

1. Vérifier l'adresse IP autorisée
2. 
Connectez-vous à MongoDB Atlas :
👉 https://cloud.mongodb.com/

Sélectionnez votre projet et cliquez sur "Network Access" dans le menu de gauche.

Vérifiez si votre adresse IP actuelle est déjà ajoutée.

4. Ajouter votre adresse IP actuelle

Cliquez sur "Add IP Address".

Sélectionnez "Allow Access from Anywhere" pour autoriser toutes les IP (⚠️ Risque de sécurité).

OU cliquez sur "Add Current IP Address" pour ajouter uniquement votre adresse IP actuelle.

Cliquez sur "Confirm" et attendez quelques minutes que la configuration prenne effet.

6. Vérifier et mettre à jour votre chaîne de connexion
Dans votre fichier d'environnement (.env) ou dans votre code (index.js ou config.js), assurez-vous que votre URI de connexion est correcte :
`
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority"
Remplacez :
`
<username> par votre nom d'utilisateur MongoDB.
<password> par votre mot de passe.
<database> par le nom de votre base de données.
