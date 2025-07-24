import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

// User/Instructor dropdown controller
@Controller('instructors')
export class InstructorController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // GET /instructors/dropdown - ინსტრუქტორების ჩამოსაშლელი სია
  @Get('dropdown')
  async getInstructorsForDropdown(): Promise<
    { id: string; name: string; email: string }[]
  > {
    const instructors = await this.userModel
      .find({
        role: 'instructor',
        isActive: true,
      })
      .select('name email')
      .sort({ name: 1 });

    return instructors.map((instructor) => ({
      id: String(instructor._id),
      name: instructor.name,
      email: instructor.email,
    }));
  }

  // GET /instructors - ყველა ინსტრუქტორი (უფრო დეტალური ინფორმაციით)
  @Get()
  async getAllInstructors() {
    return this.userModel
      .find({
        role: 'instructor',
        isActive: true,
      })
      .select(
        'name email bio avatar expertise experience education certifications',
      )
      .sort({ name: 1 });
  }

  // POST /instructors - ახალი ინსტრუქტორის შექმნა
  @Post()
  async createInstructor(
    @Body()
    instructorData: {
      name: string;
      email: string;
      bio?: string;
      expertise?: string[];
      experience?: number;
      education?: string;
      certifications?: string[];
    },
  ) {
    const instructor = new this.userModel({
      ...instructorData,
      role: 'instructor',
      isActive: true,
    });
    return instructor.save();
  }
}
