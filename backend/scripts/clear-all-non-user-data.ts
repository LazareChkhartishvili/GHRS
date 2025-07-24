import { MongooseModule } from '@nestjs/mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Category, CategorySchema } from '../src/schemas/category.schema';
import { Set, SetSchema } from '../src/schemas/set.schema';
import { Exercise, ExerciseSchema } from '../src/schemas/exercise.schema';
import * as mongoose from 'mongoose';

async function clearAllNonUserData() {
  await NestFactory.createApplicationContext(AppModule); // Initialize NestJS context to load config and modules

  const dbUri = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';

  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB.');

    const models = [
      { name: Category.name, schema: CategorySchema, collectionName: 'categories' },
      { name: Set.name, schema: SetSchema, collectionName: 'sets' },
      { name: Exercise.name, schema: ExerciseSchema, collectionName: 'exercises' },
    ];

    for (const modelInfo of models) {
      console.log(`Clearing collection: ${modelInfo.collectionName}`);
      const Model = mongoose.model(modelInfo.name, modelInfo.schema);

      // Delete all documents
      await Model.deleteMany({});
      console.log(`All documents removed from ${modelInfo.collectionName}.`);

      // Drop all indexes
      try {
        await Model.collection.dropIndexes();
        console.log(`All indexes dropped for ${modelInfo.collectionName}.`);
      } catch (error: any) {
        if (error.codeName === 'IndexNotFound') {
          console.log(`No indexes to drop for ${modelInfo.collectionName}.`);
        } else {
          console.error(`Error dropping indexes for ${modelInfo.collectionName}:`, error);
        }
      }
    }

    console.log('Finished clearing non-user data and indexes.');
  } catch (error) {
    console.error('Error during database operation:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

clearAllNonUserData(); 