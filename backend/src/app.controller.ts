import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Test endpoint-ი მონაცემების შესამოწმებლად
  @Get('test')
  getTest() {
    return {
      message: 'GRS Backend is working!',
      timestamp: new Date().toISOString(),
      endpoints: {
        courses: '/api/courses',
        categories: '/api/categories',
        courseCategories: '/api/course-categories',
        exercises: '/api/exercises',
        exerciseComplexes: '/api/exercise-complexes',
        subcategories: '/api/subcategories',
        articles: '/api/articles',
        videos: '/api/videos',
        users: '/api/users',
        sets: '/api/sets',
      },
    };
  }

  // მომხმარებლების შემოწმება
  @Get('users-count')
  async getUsersCount() {
    try {
      const count = await this.userModel.countDocuments();
      const users = await this.userModel.find().select('name email createdAt').limit(5);
      return {
        count,
        users: users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }))
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // სწრაფი მონაცემების შექმნისთვის
  @Post('seed-data')
  seedData() {
    return {
      message: 'Use individual endpoints to create test data',
      examples: {
        category: 'POST /api/categories',
        course: 'POST /api/courses',
        exercise: 'POST /api/exercises',
        subcategory: 'POST /api/subcategories',
        article: 'POST /api/articles',
        video: 'POST /api/videos',
        user: 'POST /api/users',
        set: 'POST /api/sets',
      },
    };
  }
}
