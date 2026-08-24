import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(
    __dirname,
    '../../database/migrations'
);

async function runMigrations() {
    try {
        const files = fs
            .readdirSync(migrationsPath)
            .filter((file) => file.endsWith('.sql'))
            .sort();

        for (const file of files) {
            console.log(`Running migration: ${file}`);

            const sql = fs.readFileSync(
                path.join(migrationsPath, file),
                'utf-8'
            );

            await pool.query(sql);

            console.log(`✅ ${file} completed`);
        }

        console.log('✅ All migrations completed');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
}

runMigrations();