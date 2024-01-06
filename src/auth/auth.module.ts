import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers:[UsersService,authGuard],
  exports:[
    authGuard
  ],
  imports :[
    UsersModule,
    JwtModule.register({
      global:true,
      secret : process.env.JWT_SECRET,
      signOptions:{expiresIn:'5m'}
    })
  ]
})
export class AuthModule {}
