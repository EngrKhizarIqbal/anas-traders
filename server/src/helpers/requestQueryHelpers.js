export const getPaginationParams = (req) => {
    const { page, limit, sort, searchTerm } = req.query;

    return {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
        sort:
            sort && (sort.startsWith('+') || sort.startsWith('-'))
                ? sort.substr(1)
                : sort,
        isAsc: sort && sort.startsWith('+'),
        searchTerm,
    };
};
