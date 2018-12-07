import { ApiModelProperty } from '@nestjs/swagger';

export class Ecgdata12Params {
    @ApiModelProperty({ example: '1544172183123' })
    time: string;

    @ApiModelProperty({ example: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] })
    ecg: number[];
}
