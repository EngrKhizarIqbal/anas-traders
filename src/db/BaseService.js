import * as path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class BaseService {
    constructor() {
        this.dbFilePath = path.resolve(__dirname, 'anas-traders.db');
    }

    openDatabase = async () => {
        const db = await open({
            filename: this.dbFilePath,
            driver: sqlite3.Database
          });

        db.on('trace', (query) => console.log(query));

        return db;
    };

    runAllQuery = async (query, params) => {
        let db = null;
        try {
            db = await this.openDatabase();

            const rows = await db.all(query, params);

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    };

    executeQuery = async (query, params) => {
        let db = null;

        try {
            db = this.openDatabase();

            const data = await db.get(query, params);

            return data;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    };

    runStatement = async (query, params) => {
        let db = null;

        try {
            db = await this.openDatabase();

            const statement = await db.prepare(query, params);
            await statement.run();
            await statement.finalize();
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    };
}

export default BaseService;
