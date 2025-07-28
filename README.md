# Twitter NodeJS

Ce projet est une application Twitter simplifiée développée avec Node.js, Express et MongoDB.
Deux versions existent.

## Branches

- **master**  
  Cette branche propose une version classique avec rendu de vues côté serveur (avec EJS, Pug, etc.). Les routes Express renvoient des pages HTML générées dynamiquement.  
  Elle est adaptée pour une application monolithique où le front et le back sont réunis.
  
- **api**  
  Cette branche implémente un serveur Express qui expose une API REST. Toutes les fonctionnalités (tweets, utilisateurs, authentification) sont accessibles via des endpoints API qui renvoient des réponses JSON.  
  Elle est adaptée pour être utilisée avec un front-end séparé (React, Vue, etc.) ou pour des intégrations externes.

## Fonctionnalités principales

- Authentification locale
- Création, modification, suppression de tweets
- Suivi et désabonnement d’utilisateurs
- Upload d’avatar
- Recherche d’utilisateurs

## Démarrage

```bash
git clone https://github.com/iliasse-e/twitter.git
npm install
npm start
```
