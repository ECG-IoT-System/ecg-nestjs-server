import { ApiModelProperty } from '@nestjs/swagger';

export class UserParams {
    @ApiModelProperty()
    username: string;
}
