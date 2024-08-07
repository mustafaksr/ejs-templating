const express = require('express');
const app = express();

// const { createCanvas, loadImage } = require('canvas');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();


const path = require('path')
app.use(express.static(path.join(__dirname, '/public')))


app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, '/views'))



app.get('/',(req,res)=> {
    res.render('home.ejs')

}) 


app.get('/reg',(req,res) => {
    res.render('linear/index.ejs')
    
})

app.get('/log',(req,res) => {
    res.render('logistic/index.ejs')
    
})
app.get('/income',(req,res) => {
    res.render('tf-to-tfjs/index.ejs')
    
})

app.get('/styletransfer',(req,res) => {
    const stylized = '/stylized_image.png';


    res.render('style-transfer/index3.ejs', { stylized })
    
})

// const { createCanvas, loadImage } = require('canvas');
const upload = multer({ dest: 'uploads/' });
// app.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), async (req, res) => {
    
//       const { image, image2 } = req.files;
  
//       const img1 = await loadImage(image[0].path);
//       const img2 = await loadImage(image2[0].path);
//     //TODO: write img1 and img2 to cloud storage and save names and extensions as img1_ori.jpg , img2_sty.jpg
//     // Upload img1 to Google Cloud Storage
//     const img1FileName = 'img1_ori.jpg';
//     const bucket_name = 'dataproc-staging-us-central1-657422851026-uzdp2pzb';
//     await storage.bucket(bucket_name).upload(image[0].path, {
//         destination: img1FileName,
//         metadata: {
//         contentType: 'image/jpg', // Update the content type if necessary
//         willProcessed: 'True',
//         metadata: {
//             "willProcessed": 'True', // Add custom metadata key-value pairs

//         },
//         },
//     });

//     // Upload img2 to Google Cloud Storage
//     const img2FileName = 'img2_sty.jpg';
//     await storage.bucket(bucket_name).upload(image2[0].path, {
//         destination: img2FileName,
//         metadata: {
//         contentType: 'image/jpg', // Update the content type if necessary
//         willProcessed: 'True',
//         metadata: {
//             "willProcessed": 'True', // Add custom metadata key-value pairs

//         },
//         },
//     });


//      const stylized = '/home.png';


//     res.render('home.ejs');
    
//   });

  app.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), async (req, res) => {
    const { image, image2 } = req.files;
  
    // TODO: Write img1 and img2 to cloud storage and save names and extensions as img1_ori.jpg, img2_sty.jpg
  
    // Upload img1 to Google Cloud Storage
    const img1FileName = 'img1_ori.jpg';
    const bucketName = 'dataproc-staging-us-central1-657422851026-uzdp2pzb';
    await storage.bucket(bucketName).upload(image[0].path, {
      destination: img1FileName,
      metadata: {
        contentType: 'image/jpg', // Update the content type if necessary
        metadata: {
          willProcessed: 'True', // Add custom metadata key-value pairs
        },
      },
    });
  
    // TODO: Upload img2 and perform any other necessary operations

// Upload img1 to Google Cloud Storage
const img2FileName = 'img2_sty.jpg';

await storage.bucket(bucketName).upload(image2[0].path, {
  destination: img2FileName,
  metadata: {
    contentType: 'image/jpg', // Update the content type if necessary
    metadata: {
      willProcessed: 'True', // Add custom metadata key-value pairs
    },
  },
});

    const stylized = '/stylized_image.png';
    res.render('home.ejs'); // Send a response when the upload is complete
  });
  
  

app.get('/income3',(req,res) => {
    res.render('tf-to-tfjs/index.ejs')
    
})



app.listen(3000,()=> {

    console.log("LISTENING ON PORT 3000")
    console.log("http://localhost:3000")
})
