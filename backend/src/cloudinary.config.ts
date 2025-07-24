import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dbmzjqukp',
  api_key: '622194379619647',
  api_secret: 'Gp0TVTbci1g1XcSSWLDCafr2cTQ'
});

console.log('Cloudinary configured with:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key
});

export default cloudinary; 