import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDTO } from './dto/createUser.req.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @post('')
    createUser(@ReportBody() dto: CreateUserReqDTO) {
        return this.userService.createUser(dto);
    }
    }
}

