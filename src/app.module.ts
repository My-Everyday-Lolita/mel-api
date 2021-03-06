import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { ResourcesModule } from './features/resources/resources.module';

@Module({
  imports: [
    RateLimiterModule,
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      cache: true,
    }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DB}`, {
      auth: {
        user: process.env.MONGO_ROOT,
        password: process.env.MONGO_ROOT_PASSWORD
      },
      authSource: process.env.MONGO_AUTH_SOURCE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
