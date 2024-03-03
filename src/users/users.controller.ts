import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllQuery } from './dto/find-all.query';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/commen/decorators';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users in the system' })
  @ApiOkResponse({
    description: 'Get all users in the system',
  })
  async findAll(
    @Query()
    query: FindAllQuery,
  ) {
    const value = await this.cacheManager.get('users');
    console.log(value);
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'Get user by id',
  })
  findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    console.log(currentUser);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'update user by id' })
  @ApiOkResponse({
    description: 'update user by id',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'delete user by id' })
  @ApiOkResponse({
    description: 'delete user by id',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
