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
box.isPointerBlocker = false
box.visible = true 
const clickBox = spawnEntity(box, 5, 1, 3)

let c = 1
moveBoxEntity.addComponent(
  new OnPointerDown(() => {
    c++
    sceneMessageBus.emit("moveBox", {})
  })
)

clickBox.addComponent(
  new  OnPointerDown(() => {
    clickBox.getComponent(Transform).position.y = 3
  })
)


const moveBox= () => {
  moveBoxEntity.getComponent(Transform).position.x = c
}

sceneMessageBus.on("moveBox", moveBox)

