import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserReqDTO } from './createUser.req.dto';


@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(dto: CreateUserReqDTO){

        await this.prismaService.user.create({
            data: {
                email: dto.email,
                name: dto.name
            }
        })



        return
    }
}
