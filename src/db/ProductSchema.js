
export const RealmSchemaVersion = 1

export const RealmConfig = {
    schema: [getProductSchema()],
    schemaVersion: RealmSchemaVersion
}

export function getProductSchema() {
    return {
        name: getProductSchemaName(),
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            price: 'string',
            description: 'string',
            time: 'date'
        }
    }
}
export function getProductSchemaName() {
    return 'Product';
}