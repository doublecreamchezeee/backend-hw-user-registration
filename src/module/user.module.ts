import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../service/user.s';
import { UserController } from '../controller/user.c';
import { User, UserSchema } from '../model/user.m';
import { JwtMiddleware } from '../auth/jwt.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({path: 'user/profile', method: RequestMethod.GET });
  }
}