export const ctts = {
    db: {
        url: 'URL_MONGO_DB',
        cnxName:'DATABASE_CONNECTION',
        models: {
            persona: {
                provide: 'PERSONA_MODEL',
                entityName: 'Persona'
            },
            usuario: {
                provide: 'USUARIO_MODEL',
                entityName: 'Usuario'
            },
            tipoDocumento: {
                provide: 'TDOC_MODEL',
                entityName: 'TipoDocumento'
            }
        }
    },
    jwt: {
        secret: 'coreApiPersona$...'
    },
    keys: {
        expiresIn: '600s',
        hashLevelBcrypt: 12,
        strategyJwtName: 'jwt',
        strategyLocalName: 'local'
        
    }
}; 