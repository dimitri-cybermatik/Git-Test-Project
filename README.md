
# Gestion de Stock – Mockup HTML (Fluent UI)

Ce projet est un mockup visuel d’application de gestion de stock de pièces détachées, inspiré de Fluent UI, en HTML/CSS/JS pur. Il est autonome : ouvrez simplement `index.html` dans votre navigateur.

## Fonctionnalités simulées
- Thème clair, design adaptatif (responsive)
- Navigation par menu latéral (Accueil, Pièces, Magasins, Utilisateurs, Mode Démo)
- Header moderne et application responsive
- Écrans principaux :
	- **Accueil** : synthèse, alertes stock faible
	- **Pièces** : liste, ajout, détail, modification du magasin rattaché (via modale)
	- **Magasins** : liste, ajout
	- **Utilisateurs** : liste, ajout
- Modales élégantes pour ajout/édition/suppression, accessibles depuis les écrans
- Animations simples compatibles Power Apps canevas
- Exemples de données fictives intégrés (aucune donnée réelle)
- Option de réinitialisation des données (mode démo)

## Structure du projet
- `index.html` : point d’entrée, structure principale, header, sidebar, contenu dynamique
- `style.css` : styles Fluent UI, responsive, animations, modales
- `app.js` : logique navigation/interactions, gestion des écrans, données fictives, modales
- `assets/` : icônes, images
- `database_schema.md` : proposition de schéma de base de données


## Utilisation
1. Clonez ou téléchargez ce dépôt
2. Ouvrez `index.html` dans votre navigateur **ou servez le dossier via un serveur local** (recommandé pour simuler un vrai environnement web)
3. Naviguez et testez les interactions (aucune donnée réelle n’est enregistrée)

### Démarrer un serveur local Python

Pour servir le projet en local (recommandé pour tester les imports JS/CSS ou simuler un vrai site web) :

1. Ouvrez un terminal dans le dossier du projet
2. Si vous avez un environnement virtuel, activez-le (optionnel)
3. Lancez la commande :

	```bash
	python serveur.py
	```
	ou, si vous utilisez l’environnement virtuel fourni :
	```bash
	.venv\Scripts\python.exe serveur.py
	```

4. Ouvrez [http://localhost:8000](http://localhost:8000) dans votre navigateur

Pour arrêter le serveur, faites `Ctrl+C` dans le terminal.

## Limites
- Ce mockup ne se connecte à aucune base de données réelle
- Toutes les données sont fictives et stockées en mémoire (réinitialisables via Mode Démo)
- Les interactions sont simulées (aucun backend)

## Auteur
Dimitri Goimbault

---

Pour toute question ou suggestion, ouvrez une issue ou contactez l’auteur.
