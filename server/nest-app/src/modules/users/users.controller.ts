import { Controller, Get, Post, Patch, Delete, UseGuards, HttpCode, HttpStatus, Param, ParseIntPipe, Body, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // async create(@Body() createUserDto: User) {
    //   return this.userService.create(createUserDto);
    // }
    @Get('example')
    async example() {
      console.log('hello folks')
        return "hello folks";
    }
    @Get('all')
    // @UseGuards(AuthGuard('passport-local'))
    @HttpCode(HttpStatus.OK)
    async findAll() {
      return await this.userService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id:number) {
      const result = await this.userService.findOne(id);
      return JSON.stringify(result)
    }
    
    /*
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto) {
      return this.userService.update(id, updateProfileDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.userService.softDelete(id);
    }*/
}
