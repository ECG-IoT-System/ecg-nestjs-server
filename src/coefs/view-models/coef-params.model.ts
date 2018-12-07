import { ApiModelProperty } from '@nestjs/swagger';

export class CoefParams {
    @ApiModelProperty({ example: 1})
    version: number;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty({ example: '12345' })
    F: string;

    @ApiModelProperty({ example: '23456' })
    K: string;

    @ApiModelProperty({ example: '12345' })
    HH: string;
}
