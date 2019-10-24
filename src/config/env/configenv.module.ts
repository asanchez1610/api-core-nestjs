import { Module } from '@nestjs/common';
import { ConfigEnvService } from './configenv.service'; 

@Module({
    providers:[
        {
            provide: ConfigEnvService,
            useValue: new ConfigEnvService(`${process.env.NODE_ENV || ''}.env`)
        }
    ]
})
export class ConfigEnvModule {}
