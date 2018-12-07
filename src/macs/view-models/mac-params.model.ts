import { ApiModelProperty } from '@nestjs/swagger';

export class MacParams {
    @ApiModelProperty({ example: 'ab12cd34ef57' })
    mac: string;

    @ApiModelProperty({ example: '1', minimum: 1, maximum: 3 })
    device_id: number;
}
