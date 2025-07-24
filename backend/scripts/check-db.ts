import { connect, model } from 'mongoose';
import { Article, ArticleSchema } from '../src/schemas/article.schema';
import { Blog, BlogSchema } from '../src/schemas/blog.schema';

const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Initialize models
    const ArticleModel = model('Article', ArticleSchema);
    const BlogModel = model('Blog', BlogSchema);

    // Check articles
    const articles = await ArticleModel.find();
    console.log('\nArticles:', articles.length);
    for (const article of articles) {
      console.log(`- ${article._id}: ${article.title?.ka || 'No title'} (Blog: ${article.blogId})`);
    }

    // Check blogs
    const blogs = await BlogModel.find();
    console.log('\nBlogs:', blogs.length);
    for (const blog of blogs) {
      console.log(`- ${blog._id}: ${blog.title?.ka || 'No title'} (Articles: ${blog.articles?.length || 0})`);
      if (blog.articles?.length > 0) {
        console.log('  Articles:', blog.articles);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase(); 