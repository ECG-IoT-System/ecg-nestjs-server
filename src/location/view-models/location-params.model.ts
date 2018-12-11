import { ApiModelProperty } from '@nestjs/swagger';

export class LocationParams {
    @ApiModelProperty({ example: 112345})
    timestamp: number;

    @ApiModelProperty({ example: 1.1})
    x: number;

    @ApiModelProperty({ example: 2.2 })
    y: number;
}
