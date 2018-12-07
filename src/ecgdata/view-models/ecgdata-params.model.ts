import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class EcgdataParams {
    @ApiModelProperty({ example: 'ab12cd34ef57' })
    mac: string;

    @ApiModelProperty({ example: '[1544172184000, 1544172185000]' })
    time: Array<number>;

    @ApiModelProperty({ example: '[1, 2, 3]' })
    data: Array<number>;

    @ApiModelProperty({ example: '[1, 2, 3]' })
    gsensor: Array<number>;

    @ApiModelPropertyOptional({ example: '-87' })
    rssi: number;
}
