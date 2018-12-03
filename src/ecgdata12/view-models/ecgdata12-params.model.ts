import { ApiModelProperty } from '@nestjs/swagger';

export class Ecgdata12Params {
    @ApiModelProperty()
    time: string;

    @ApiModelProperty()
    ecg: Array<number>;
}
