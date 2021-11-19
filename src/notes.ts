// import * as utils from '@dcl/ecs-scene-utils'


// // usefull function from tutorial, but use of generic shape instead of GLTFShape
// function spawnEntity(shape: Shape, x: number, y: number, z: number, rotation?: Quaternion) {
//     // create the entity
//     const entity = new Entity()

//     // add a transform to the entity
//     entity.addComponent(new Transform({ position: new Vector3(x, y, z), rotation }))

//     // add a shape to the entity
//     entity.addComponent(shape)

//     // if (rotation) entity.addComponent(rotation)

//     // add the entity to the engine
//     engine.addEntity(entity)

//     return entity
// }

// const box = spawnEntity(new BoxShape(), 8, 1.5, 8, new Quaternion(0, 180))
// const coin = spawnEntity(new GLTFShape('models/coin.glb'), 8, 1.5, 8, new Quaternion(0, 180))



// // play sound 
// const pickupSound = new Entity()
// engine.addEntity(pickupSound)
// pickupSound.addComponent(
//   new AudioSource(new AudioClip("sounds/coindrop.mp3"))
// )

// pickupSound.getComponent(AudioSource).playOnce()


// // attach to the player / pick up a coin
// var OnClickComponent = new OnClick(() => {
//     coin.getComponent(Transform).position = new Vector3(0, 0, 1)

//     // one of two options
//     // coin.setParent(Attachable.FIRST_PERSON_CAMERA)
//     coin.setParent(Attachable.AVATAR)

//     // to dettach from player
//     coin.setParent(null)
// })

// // place coin on the box
// let boxOnClick = new OnClick(() => {
//     let boxPosition = box.getComponent(Transform).position

//     // place on top of the box
//     coin.getComponent(Transform).position = new Vector3(boxPosition.x, pieceHeight, boxPosition.z)
//     coin.setParent(null)
// })

// box.addComponent(boxOnClick)

// // use components as flags
// @Component("pieceFlag")
// export class PieceFlag {}

// // so you can select group of components that share same flag
// const pieceGroup = engine.getComponentGroup(PieceFlag)

// // and you can do movement, rotation after that
// export class SimpleRotate implements ISystem {
//   update() {
//     for (let entity of pieceGroup.entities) {
//       const transform = entity.getComponent(Transform)
//       transform.rotate(Vector3.Left(), 3)
//     }
//   }
// }
// engine.addSystem(new SimpleRotate())


// // you can add materials to the objects
// // grey shiny, reflective box
// const boardMaterial = new Material()
// boardMaterial.albedoColor = Color3.Gray()
// boardMaterial.metallic = 1.0
// boardMaterial.roughness = 0.0

// box.addComponent(boardMaterial)


// // that is how I roughly made a chess board
// @Component("boardCellFlag")
// export class BoardCellFlag {}

// function makeChessBoard() {
//   for(let i = 1; i < 9; i++) {
//     for(let j = 1; j < 9; j++) {

//       // draw board
//       let box = spawnEntity(new BoxShape(), 3.5 + j, 0, 3.5 + i)

//       // add flag to select them later
//       box.addComponent(new BoardCellFlag())
      
//       const boardMaterial = new Material()


//       if ((i + j) % 2 == 1) {
//         boardMaterial.albedoColor = Color3.Gray()
//       } else {
//         boardMaterial.albedoColor = Color3.White()
//       }
//       boardMaterial.metallic = 1.0
//       boardMaterial.roughness = 0.0

//       box.addComponent(boardMaterial)
      
      

//     }
//   }
// }


