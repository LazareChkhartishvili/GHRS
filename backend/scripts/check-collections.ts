import mongoose from 'mongoose';

async function checkCollections() {
  try {
    await mongoose.connect('mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db');
    console.log('MongoDB-სთან კავშირი დამყარებულია\n');

    // მივიღოთ ყველა კოლექცია
    const collections = await mongoose.connection.db.collections();
    
    for (const collection of collections) {
      const count = await collection.countDocuments();
      console.log(`\n🗂️  კოლექცია: ${collection.collectionName}`);
      console.log(`📊 დოკუმენტების რაოდენობა: ${count}`);
      
      if (count > 0) {
        // ვაჩვენოთ პირველი დოკუმენტის მაგალითი
        const sample = await collection.findOne();
        console.log('\n📄 მაგალითი დოკუმენტი:');
        console.log(JSON.stringify(sample, null, 2));
      }
      console.log('\n' + '-'.repeat(50));
    }

  } catch (error) {
    console.error('შეცდომა:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB-სთან კავშირი დასრულებულია');
  }
}

checkCollections(); 