import { ApiModelProperty } from "@nestjs/swagger";

export class MacParams {
    @ApiModelProperty()
    user_id: string;

    @ApiModelProperty()
    mac: string;

    @ApiModelProperty()
    device_id: number;
}
