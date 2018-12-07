import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class EcgdataParams {
    @ApiModelProperty()
    mac: string;

    @ApiModelProperty()
    time: Array<number>;

    @ApiModelProperty()
    data: Array<number>;

    @ApiModelProperty()
    gsensor: Array<number>;

    @ApiModelPropertyOptional()
    rssi: number;
}
