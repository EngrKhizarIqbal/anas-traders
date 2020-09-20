import BaseService from './BaseService';

export default class ShopService extends BaseService {
    getAll = ({ page, limit, sort, isAsc, searchTerm }) => {
        sort = sort || 'name';
        const queryParams = {};
        let query = `SELECT * FROM "shop"`;

        if (searchTerm) {
            query += ` WHERE lower(\`name\`) LIKE $searchTerm OR lower(\`address\`) LIKE $searchTerm`;
            queryParams['$searchTerm'] = `%${searchTerm.toLowerCase()}%`;
        }

        if (sort) {
            query += ` ORDER BY \`${sort}\` ${isAsc ? 'ASC' : 'DESC'};`;
        }

        return this.runAllQuery(query, queryParams);
    };

    addShop = ({ name, address }) =>
        this.runStatement('INSERT INTO "shop" (name, address) VALUES(?, ?);', [
            name,
            address,
        ]);

    updateShop = ({ id, name, address }) =>
        this.runStatement(
            'UPDATE "shop" SET name = ?, address = ? WHERE id = ?;',
            [name, address, id]
        );

    removeShops = (shopIds) =>
        this.runStatement(
            `DELETE FROM "shop" WHERE id IN (${new Array(shopIds.length)
                .fill('?')
                .join(',')});`,
            shopIds
        );
}
