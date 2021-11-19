import * as utils from '@dcl/ecs-scene-utils'
import { convertMessageToObject } from '@decentraland/EthereumController'


function spawnEntity(shape: Shape, x: number, y: number, z: number, rotation?: Quaternion) {
  // create the entity
  const entity = new Entity()

  // add a transform to the entity
  entity.addComponent(new Transform({ position: new Vector3(x, y, z), rotation }))

  // add a shape to the entity
  entity.addComponent(shape)

  // if (rotation) entity.addComponent(rotation)

  // add the entity to the engine
  engine.addEntity(entity)

  return entity
}


const sceneMessageBus = new MessageBus()
const moveBoxEntity = spawnEntity(new BoxShape, 3, 1, 3)
const box = new BoxShape()

box.withCollisions = false
box.isPointerBlocker = false
box.visible = true 
const clickBox = spawnEntity(box, 5, 1, 3)

const myMat = new Material()
myMat.albedoColor = new Color4(1, 0, 0, 0.5)

clickBox.addComponent(myMat)
moveBoxEntity.addComponent(myMat)

let c = 1
// moveBoxEntity.addComponent(
//   new OnPointerDown(() => {
//     c++
//     sceneMessageBus.emit("moveBox", {})
//   })
// )

clickBox.addComponent(
  new  OnPointerDown(() => {
    clickBox.getComponent(Transform).position.y = 3
  })
)


const moveBox= () => {
  moveBoxEntity.getComponent(Transform).position.x = c
}

//  This one being triggered, but update to multiplayer scene happence only once
sceneMessageBus.on("moveBox", moveBox)

