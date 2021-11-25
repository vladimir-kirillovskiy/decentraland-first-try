import * as utils from '@dcl/ecs-scene-utils'
import { convertMessageToObject } from '@decentraland/EthereumController'


function spawnEntity(shape: Shape, x: number, y: number, z: number, rotation?: Quaternion) {
  const entity = new Entity()
  entity.addComponent(new Transform({ position: new Vector3(x, y, z), rotation }))
  entity.addComponent(shape)
  engine.addEntity(entity)
  return entity
}

const sceneMessageBus = new MessageBus()
const moveBoxEntity = spawnEntity(new BoxShape, 3, 1, 3)

moveBoxEntity.addComponent(
  new OnPointerDown(() => {
    sceneMessageBus.emit("moveBox", {})
  })
)

const moveBox = () => {
  moveBoxEntity.getComponent(Transform).position.x += 1
}

//  This one being triggered, but update to multiplayer scene happence only once
sceneMessageBus.on("moveBox", moveBox)

