# Schéma de base de données – Gestion de stock

Ce schéma relationnel est adapté à l’application de gestion de stock simulée dans ce mockup. Il couvre la gestion des utilisateurs, magasins, pièces, et mouvements de stock.

## Tables principales

### Users
- id (PK, int, auto)
- name (varchar)
- email (varchar, unique)
- role (varchar)  -- Admin, Utilisateur

### Stores
- id (PK, int, auto)
- name (varchar)
- location (varchar)

### Parts
- id (PK, int, auto)
- name (varchar)
- ref (varchar, unique)
- stock (int)
- storeId (FK → Stores.id)  -- Le magasin rattaché à la pièce peut être modifié depuis l'interface

### StockMovements
- id (PK, int, auto)
- partId (FK → Parts.id)
- type (varchar)  -- Entrée, Sortie
- qty (int)
- date (date)
- userId (FK → Users.id)

## Relations
- Un magasin (`Stores`) possède plusieurs pièces (`Parts`)
- Un mouvement de stock (`StockMovements`) concerne une pièce, est réalisé par un utilisateur, et a lieu dans un magasin via la pièce
- Les utilisateurs peuvent être administrateurs ou utilisateurs simples

## Extensions possibles
- Table `Roles` pour gestion fine des permissions
- Table `AuditLogs` pour traçabilité
- Table `Suppliers` pour gestion des fournisseurs

---

Ce schéma peut être implémenté dans SQL Server, MySQL, PostgreSQL ou Power Apps Dataverse.
