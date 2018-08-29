const fileLoader=require('../../app/modules/loader.js');
const voxelCube=require('../../app/modules/binaryVoxelCubeAsync.js');
const event=require('../../app/modules/event.js');
const exportImages=require('../../app/modules/exportImages.js');
const importImages=require('../../app/modules/imageLoader.js');

const commonChannel=new event();
commonChannel.on("progress",(data)=>{
  console.log(data);
});

fileLoader.async('./model.photon',commonChannel).then((photonFile)=>{
  new voxelCube(photonFile.header.resX,photonFile.header.resY,photonFile.layers.length,photonFile.voxels,null,commonChannel).then((model)=>{
    importImages.loadImage('./texture.png').then(png=>{
      importImages.pngToArray(png).then(heightmap=>{
        model.verticalMap(heightmap,50).then(ret=>{
          exportImages(ret,'./export',commonChannel).then(()=>{
            console.log('done');
          });
        })
      })
    })
  });
});