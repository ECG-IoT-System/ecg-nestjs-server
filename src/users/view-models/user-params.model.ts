import { ApiModelProperty } from '@nestjs/swagger';

export class UserParams {
    @ApiModelProperty({ example: 'akii' })
    username: string;
}
