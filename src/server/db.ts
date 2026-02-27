import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../ecommerce.db');
const db = new Database(dbPath);

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    brand TEXT,
    rating REAL DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

// Seed data if empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, category, brand, rating, reviews_count, image_url, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedProducts = [
    ['Création de Logo', 'Logo sur mesure, 3 propositions, fichiers sources inclus', 149.00, 'Identité Visuelle', 'Samy MultiService', 4.9, 128, 'https://picsum.photos/seed/logo/800/600', 999],
    ['Affiche Web', 'Design d\'affiche pour réseaux sociaux et sites web', 49.00, 'Web Design', 'Samy MultiService', 4.8, 450, 'https://picsum.photos/seed/webposter/800/600', 999],
    ['Affiche d\'Anniversaire', 'Affiche personnalisée pour anniversaire, format impression', 39.00, 'Événementiel', 'Samy MultiService', 4.7, 890, 'https://picsum.photos/seed/birthday/800/600', 999],
    ['Maquette Professionnelle', 'Maquette UI/UX pour application web ou mobile', 299.00, 'Web Design', 'Samy MultiService', 4.8, 320, 'https://picsum.photos/seed/mockup/800/600', 999],
    ['Carte de Visite', 'Design recto-verso, prêt pour l\'impression', 29.00, 'Identité Visuelle', 'Samy MultiService', 4.6, 112, 'https://picsum.photos/seed/businesscard/800/600', 999],
    ['Flyer Promotionnel', 'Design de flyer A5 pour vos événements ou promotions', 59.00, 'Print', 'Samy MultiService', 4.9, 1200, 'https://picsum.photos/seed/flyer/800/600', 999],
    ['Bannière Réseaux Sociaux', 'Pack de bannières pour Facebook, Twitter, LinkedIn', 79.00, 'Web Design', 'Samy MultiService', 4.8, 210, 'https://picsum.photos/seed/banner/800/600', 999],
    ['Charte Graphique Complète', 'Logo, typographie, couleurs, déclinaisons', 499.00, 'Identité Visuelle', 'Samy MultiService', 4.8, 2500, 'https://picsum.photos/seed/branding/800/600', 999],
    ['Menu de Restaurant', 'Design de menu élégant et lisible', 89.00, 'Print', 'Samy MultiService', 4.9, 3400, 'https://picsum.photos/seed/menu/800/600', 999],
    ['Retouche Photo', 'Retouche professionnelle, colorimétrie, détourage', 19.00, 'Photographie', 'Samy MultiService', 4.7, 430, 'https://picsum.photos/seed/retouch/800/600', 999],
    ['Illustration Sur Mesure', 'Illustration vectorielle pour vos projets', 129.00, 'Illustration', 'Samy MultiService', 4.8, 1500, 'https://picsum.photos/seed/illustration/800/600', 999],
    ['Packaging Produit', 'Design d\'emballage attractif et professionnel', 199.00, 'Print', 'Samy MultiService', 4.7, 320, 'https://picsum.photos/seed/packaging/800/600', 999]
  ];

  const insertMany = db.transaction((products) => {
    for (const p of products) {
      insertProduct.run(p);
    }
  });

  insertMany(seedProducts);
}

export default db;
