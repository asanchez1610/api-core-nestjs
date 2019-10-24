import { Connection } from 'mongoose';
import { ctts } from '../../util/constants';
import { UsuarioSchema } from '../models.schemas';

export const UsuarioProvider = [
    {
        provide: ctts.db.models.usuario.provide,
        useFactory: (connection: Connection) => connection.model(ctts.db.models.usuario.entityName, UsuarioSchema),
        inject: [ctts.db.cnxName]
    }
];