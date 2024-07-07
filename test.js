import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello, World!';
  }
}



import { Controller, Get, Param } from '@nestjs/common';

@Controller('greet')
export class AppController {
  @Get(':name')
  getGreeting(@Param('name') name: string): string {
    return `Hello, ${name}! Welcome to NestJS!`;
  }
}



@Controller('user')
export class AppController {
  private users: any[] = [];

  @Get()
  getUsers(): any[] {
     return this.users;
   }

  @Post()
   createUser(@Body() newUser: any): string {
     this.users.push(newUser);
     return 'User created successfully!';
   }

  @Put(':id')
   updateUser(@Param('id') id: number, @Body() updatedUser: any): string {
     this.users[id] = updatedUser;
     return `User with ID ${id} updated successfully!`;
   }
}



import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class AppController {
   private users: any[] = [];

  @Post()
   createUser(@Body() newUser: CreateUserDto): string {
     if (!newUser.username || !newUser.email) {
       throw new HttpException('Username and email are required fields!', HttpStatus.BAD_REQUEST);
     }
     this.users.push(newUser);
     return 'User created successfully!';
   }
}