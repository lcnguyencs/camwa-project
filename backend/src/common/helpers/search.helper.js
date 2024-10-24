import { Op } from 'sequelize'; 

export const searchInTable = async (model, query) => {
    try {
        // Construct the where clause based on the query parameters
        const whereClause = {};
        
        // Iterate over the query parameters
        for (const [key, value] of Object.entries(query)) {
            // Check if the value is a string for partial matching
            if (typeof value === 'string') {
                whereClause[key] = { [Op.like]: `%${value}%` }; // Partial match
            } else {
                whereClause[key] = value; // Exact match for non-string types
            }
        }

        // Perform the search in the specified model
        const results = await model.findAll({ where: whereClause });

        // Return results or a message if no records found
        return results.length > 0 ? results : { message: 'No records found' };
    } catch (error) {
        throw new Error('Error searching in the table: ' + error.message);
    }
};