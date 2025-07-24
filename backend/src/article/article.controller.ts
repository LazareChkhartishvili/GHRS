import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import cloudinary from '../cloudinary.config';
import * as streamifier from 'streamifier';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  private uploadToCloudinary = (file: Express.Multer.File, resource_type: 'image' | 'video') => {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type,
          folder: 'grs/articles',
          transformation: resource_type === 'image' ? [
            { width: 1400, height: 518, crop: 'fill' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  };

  @Post('json')
  async createJson(@Body() createArticleDto: CreateArticleDto) {
    console.log('📝 Creating article with JSON data');
    console.log('Body received:', createArticleDto);

    try {
      const result = await this.articleService.create(createArticleDto);
      return result;
    } catch (error) {
      console.error('❌ Error in create article JSON controller:', error);
      throw new BadRequestException(error.message || 'Failed to create article');
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createArticleDto: any,
  ) {
    console.log('📝 Creating article with file upload');
    console.log('Files received:', files?.length || 0);
    console.log('Body received:', Object.keys(createArticleDto));

    try {
      // Parse JSON strings from FormData
      const parsedData = {
        ...createArticleDto,
        title: JSON.parse(createArticleDto.title),
        excerpt: JSON.parse(createArticleDto.excerpt),
        content: JSON.parse(createArticleDto.content),
        author: JSON.parse(createArticleDto.author),
        tableOfContents: createArticleDto.tableOfContents ? JSON.parse(createArticleDto.tableOfContents) : [],
        tags: createArticleDto.tags ? JSON.parse(createArticleDto.tags) : [],
      };

      let featuredImages: string[] = [];

      // Upload images to Cloudinary if provided
      if (files && files.length > 0) {
        console.log(`📤 Uploading ${files.length} images to Cloudinary...`);
        
        const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
        const uploadResults = await Promise.all(uploadPromises);
        
        featuredImages = uploadResults.map((result: any) => result.secure_url);
        console.log('✅ Images uploaded successfully:', featuredImages);
      }

      const articleData = {
        ...parsedData,
        featuredImages,
      };

      const result = await this.articleService.create(articleData);
      return result;
    } catch (error) {
      console.error('❌ Error in create article controller:', error);
      throw new BadRequestException(error.message || 'Failed to create article');
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    console.log('📚 GET /articles - Query params:', query);
    return this.articleService.findAll(query);
  }

  @Get('featured')
  async findFeatured() {
    console.log('⭐ GET /articles/featured');
    return this.articleService.findFeatured();
  }

  @Get('popular')
  async findPopular(@Query('limit') limit?: string) {
    console.log('🔥 GET /articles/popular - Limit:', limit);
    const limitNum = limit ? parseInt(limit, 10) : 6;
    return this.articleService.findPopular(limitNum);
  }

  @Get('search')
  async search(@Query('q') searchTerm: string) {
    console.log('🔍 GET /articles/search - Term:', searchTerm);
    if (!searchTerm) {
      throw new BadRequestException('Search term is required');
    }
    return this.articleService.search(searchTerm);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    console.log('📂 GET /articles/category/:categoryId - Category:', categoryId);
    return this.articleService.findByCategory(categoryId);
  }

  @Get('blog/:blogId')
  async findByBlog(@Param('blogId') blogId: string) {
    console.log('📚 GET /articles/blog/:blogId - Blog ID:', blogId);
    return this.articleService.findByBlog(blogId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('📖 GET /articles/:id - ID:', id);
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateArticleDto: any,
  ) {
    console.log('📝 PATCH /articles/:id - ID:', id);
    console.log('Files received:', files?.length || 0);

    try {
      // Parse JSON strings from FormData
      const parsedData: any = {};
      
      if (updateArticleDto.title) parsedData.title = JSON.parse(updateArticleDto.title);
      if (updateArticleDto.excerpt) parsedData.excerpt = JSON.parse(updateArticleDto.excerpt);
      if (updateArticleDto.content) parsedData.content = JSON.parse(updateArticleDto.content);
      if (updateArticleDto.author) parsedData.author = JSON.parse(updateArticleDto.author);
      if (updateArticleDto.tableOfContents) parsedData.tableOfContents = JSON.parse(updateArticleDto.tableOfContents);
      if (updateArticleDto.tags) parsedData.tags = JSON.parse(updateArticleDto.tags);
      
      // Copy other simple fields
      ['categoryId', 'readTime', 'isPublished', 'isFeatured', 'isActive', 'sortOrder'].forEach(field => {
        if (updateArticleDto[field] !== undefined) {
          parsedData[field] = updateArticleDto[field];
        }
      });

      // Upload new images if provided
      if (files && files.length > 0) {
        console.log(`📤 Uploading ${files.length} new images to Cloudinary...`);
        
        const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
        const uploadResults = await Promise.all(uploadPromises);
        
        const newImages = uploadResults.map((result: any) => result.secure_url);
        
        // Merge with existing images or replace them
        parsedData.featuredImages = newImages;
        console.log('✅ New images uploaded successfully:', newImages);
      }

      const result = await this.articleService.update(id, parsedData);
      return result;
    } catch (error) {
      console.error('❌ Error in update article controller:', error);
      throw new BadRequestException(error.message || 'Failed to update article');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('🗑️ DELETE /articles/:id - ID:', id);
    return this.articleService.remove(id);
  }

  @Post(':id/like')
  async incrementLikes(@Param('id') id: string) {
    console.log('👍 POST /articles/:id/like - ID:', id);
    return this.articleService.incrementLikes(id);
  }
} 