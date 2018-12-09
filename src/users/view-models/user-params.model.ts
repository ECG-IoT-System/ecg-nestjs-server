import { ApiModelProperty } from '@nestjs/swagger';

export class UserParams {
    @ApiModelProperty({ example: 'akii' })
    username: string;

    @ApiModelProperty({ default: '0' })
    lasttime: number;

    @ApiModelProperty({ default: '0' })
    lasttime_12L: number;

    @ApiModelProperty({ default: '0' })
    lasttime_afstat: number;
}
