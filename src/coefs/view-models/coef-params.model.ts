import { ApiModelProperty } from "@nestjs/swagger";

export class CoefParams {
    @ApiModelProperty()
    user_id: string;

    @ApiModelProperty()
    version: number;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty()
    F: string;

    @ApiModelProperty()
    K: string;

    @ApiModelProperty()
    HH: string;
}
