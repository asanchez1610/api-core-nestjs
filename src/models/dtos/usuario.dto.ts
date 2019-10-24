import { ApiModelProperty } from "@nestjs/swagger";

export class UsuarioDto {
    @ApiModelProperty({ description: 'id del usuario' })
    id: string;

    @ApiModelProperty({ description: 'nombre de usuario' })
    userName: string;

    @ApiModelProperty({ description: 'contraseña de acceso del usuario' })
    password: string;
}