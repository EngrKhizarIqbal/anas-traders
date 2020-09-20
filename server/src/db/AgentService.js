import BaseService from './BaseService';

export default class AgentService extends BaseService {
    getAll = ({ page, limit, sort, isAsc, searchTerm }) => {
        sort = sort || 'name';
        const queryParams = {};
        let query = `SELECT * FROM "agents"`;

        if (searchTerm) {
            query += ` WHERE lower(\`name\`) LIKE $searchTerm`;
            queryParams['$searchTerm'] = `%${searchTerm.toLowerCase()}%`;
        }

        if (sort) {
            query += ` ORDER BY \`${sort}\` ${isAsc ? 'ASC' : 'DESC'};`;
        }

        return this.runAllQuery(query, queryParams);
    };

    add = (agentData) =>
        this.runStatement('INSERT INTO "agents" (name) VALUES(?);', [
            agentData.name,
        ]);

    update = (agentData) =>
        this.runStatement('UPDATE "agents" SET name = ? WHERE id = ?;', [
            agentData.name,
            agentData.id,
        ]);

    delete = (agentIds) =>
        this.runStatement(
            `DELETE FROM "agents" WHERE id IN (${new Array(agentIds.length)
                .fill('?')
                .join(',')});`,
            agentIds
        );
}
