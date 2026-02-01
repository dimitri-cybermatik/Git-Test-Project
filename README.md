
# Gestion de Stock – Mockup HTML (Fluent UI) ✨

Ce projet est un mockup visuel d'application de gestion de stock de pièces détachées, inspiré de Fluent UI, en HTML/CSS/JS pur. Il est autonome : ouvrez simplement `index.html` dans votre navigateur.

## ✨ Design moderne et coloré

Le projet arbore un design vibrant et moderne avec :
- **Dégradés colorés animés** sur le header (animation rainbow)
- **Palette de couleurs vibrante** : indigo, violet, rose, cyan, vert, orange
- **Animations fluides** : fade-in, pulse, shimmer, float, glow
- **Effets de verre** (backdrop-filter) et ombres colorées
- **Thème sombre pour la sidebar** avec effets décoratifs
- **Cartes et composants avec hover effects** élégants

## Dernières améliorations (2026-01)
- Correction du débordement de la bulle "Bienvenue !" dans le header : la bulle reste bien dans la barre supérieure, même avec un texte long ou sur petit écran
- Footer modernisé : nouveau style dégradé, alignement flex, meilleure visibilité et design plus élégant
- Nettoyage du CSS : suppression des doublons, meilleure organisation, responsive amélioré
- **Menu mobile hamburger** : navigation mobile fluide avec overlay et animation slide pour une expérience mobile optimale
- **Design flashy et coloré** : couleurs vibrantes, animations CSS, dégradés dynamiques sur tous les composants

## Fonctionnalités simulées
- Thème clair avec design vibrant et adaptatif (responsive)
- Navigation par menu latéral (Accueil, Pièces, Magasins, Utilisateurs, Mode Démo)
- **Menu hamburger mobile** : navigation optimisée pour petits écrans avec overlay
- Header moderne avec animation rainbow et bulle de bienvenue
- Application entièrement responsive (desktop, tablette, mobile)
- Écrans principaux :
	- **Accueil** : synthèse, alertes stock faible
	- **Pièces** : liste, ajout, détail, modification du magasin rattaché (via modale)
	- **Magasins** : liste, ajout
	- **Utilisateurs** : liste, ajout
- Modales élégantes pour ajout/édition/suppression, accessibles depuis les écrans
- Animations simples compatibles Power Apps canevas
- Exemples de données fictives intégrés (aucune donnée réelle)
- Option de réinitialisation des données (mode démo)

## Structure du projet
- `index.html` : point d'entrée, structure principale, header, sidebar, contenu dynamique
- `style.css` : styles Fluent UI modernes, responsive, animations, modales
	- Design coloré avec dégradés vibrants (indigo, violet, rose, cyan, vert, orange)
	- Animations CSS : rainbow, fade-in, pulse, shimmer, float, glow
	- Header et footer refaits avec animations, bulle Bienvenue protégée contre le débordement
	- Menu mobile hamburger avec overlay et animations slide
	- Effets de verre (backdrop-filter) et ombres colorées
- `app.js` : logique navigation/interactions, gestion des écrans, données fictives, modales
	- Menu mobile avec gestion de l'overlay et du scroll
	- Navigation dynamique entre les écrans
	- Gestion des données fictives (CRUD)
- `test.html` : fichier de test simple pour valider le fonctionnement JavaScript
- `assets/` : icônes, images (stock.svg)
- `database_schema.md` : proposition de schéma de base de données relationnelle
- `Training Files/` : fichiers de formation Git
	- `Commandes utiles GIT.txt` : liste des commandes Git courantes
- `Logs & Infos/` : fichiers de logs et informations


## Utilisation
1. Clonez ou téléchargez ce dépôt
2. Ouvrez `index.html` dans votre navigateur **ou servez le dossier via un serveur local** (recommandé pour simuler un vrai environnement web)
3. Naviguez et testez les interactions (aucune donnée réelle n'est enregistrée)
4. Pour tester le menu mobile, réduisez la fenêtre du navigateur ou utilisez les outils de développement (F12) pour émuler un appareil mobile

### Démarrer un serveur local Python

Pour servir le projet en local (recommandé pour tester les imports JS/CSS ou simuler un vrai site web) :

1. Ouvrez un terminal dans le dossier du projet
2. Si vous avez un environnement virtuel, activez-le (optionnel)
3. Lancez la commande :

	```bash
	python -m http.server 8000
	```

4. Ouvrez [http://localhost:8000](http://localhost:8000) dans votre navigateur

Pour arrêter le serveur, faites `Ctrl+C` dans le terminal.

## Limites
- Ce mockup ne se connecte à aucune base de données réelle
- Toutes les données sont fictives et stockées en mémoire (réinitialisables via Mode Démo)
- Les interactions sont simulées (aucun backend)

## Technologies utilisées
- **HTML5** : structure sémantique
- **CSS3** : animations, dégradés, backdrop-filter, flexbox, grid
- **JavaScript vanilla** : pas de framework, code pur pour simplicité et performance
- **Fluent UI** : inspiration pour le design et les composants

## Auteur
Dimitri Goimbault

---

Pour toute question ou suggestion, ouvrez une issue ou contactez l'auteur.
