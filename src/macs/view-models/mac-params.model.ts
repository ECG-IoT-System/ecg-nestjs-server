import { ApiModelProperty } from '@nestjs/swagger';

export class MacParams {
    @ApiModelProperty()
    mac: string;

    @ApiModelProperty()
    device_id: number;
}
