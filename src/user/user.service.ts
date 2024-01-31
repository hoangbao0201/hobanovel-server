import { Prisma } from '@prisma/client';
import { isEmail } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async userDetail(username: string): Promise<any> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    username: username,
                },
                select: {
                    userId: true,
                    username: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                    createdAt: true,
                    description: true,
                    rank: true,
                    role: true,
                },
            });
    
            return {
                success: true,
                user: user,
            };
        } catch (error) {
            return {
                success: false,
                error: error
            }
        }
    }

    //
    async findById(userId: string) {
        return await this.prismaService.user.findUnique({
            where: {
                userId: userId,
            },
        });
    }

    async findByAccout(accout: string) {
        let where: Prisma.UserWhereUniqueInput;
        if(isEmail(accout)) {
            where = {
                email: accout
            }
        }
        else {
            where = {
                username: accout
            }
        }
        return await this.prismaService.user.findUnique({
            where: where,
            include: {
                role: true
            }
        });
    }
}
