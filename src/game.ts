import * as utils from '@dcl/ecs-scene-utils'


/// --- Set up a system ---

// class RotatorSystem {
//   // this group will contain every entity that has a Transform component
//   group = engine.getComponentGroup(Transform)

//   update(dt: number) {
//     // iterate over the entities of the group
//     for (let entity of this.group.entities) {
//       // get the Transform component of the entity
//       const transform = entity.getComponent(Transform)

//       // mutate the rotation
//       transform.rotate(Vector3.Up(), dt * 10)
//     }
//   }
// }



// Add a new instance of the system to the engine
// engine.addSystem(new RotatorSystem())


/// --- Spawner function ---

function spawnEntity(shape: GLTFShape, x: number, y: number, z: number, rotation?: Quaternion) {
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

/// --- Spawn a cube ---
const deskModel = new GLTFShape('models/desk.glb')
const laptopModel = new GLTFShape('models/laptop.glb')
const danceModel = new GLTFShape('models/dance.glb')
const desk = spawnEntity(deskModel, 8, 0, 8)
const laptop = spawnEntity(laptopModel, 8, 1.5, 8, new Quaternion(0, 180))
const coin = spawnEntity(new GLTFShape('models/coin.glb'), 5, 1.5, 5)
const dance = spawnEntity(danceModel, 5, 0, 8)

const pickupSound = new Entity()
engine.addEntity(pickupSound)
pickupSound.addComponent(
  new AudioSource(new AudioClip("sounds/coindrop.mp3"))
)


// -- attach to the player
// const followTheCamera = new Entity()
// followTheCamera.addComponent(new BoxShape())
// followTheCamera.addComponent(
//   new Transform({
//     position: new Vector3(0, 0.5, 3),
//   })
// )
// engine.addEntity(followTheCamera)
// followTheCamera.setParent(Attachable.FIRST_PERSON_CAMERA)


export class CoinRotate implements ISystem {
  update() {
    let transform = coin.getComponent(Transform)
    transform.rotate(Vector3.Down(), 3)
  }
}

engine.addSystem(new CoinRotate())

coin.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(0, 3, 0), new Vector3(0, 3, 0)),
    {
      onCameraEnter: () => {
        coin.getComponent(Transform).scale.setAll(0)
        pickupSound.getComponent(AudioSource).playOnce()
      },
      onCameraExit: () => {
        engine.removeEntity(coin)
      }
    }
  )
)

var OnClickComponent = new OnClick(() => {
  // laptop.getComponent(Transform).scale.z *= 1.1
  // laptop.getComponent(Transform).scale.x *= 0.9

  // spawnEntity(laptopModel, Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)

  laptop.getComponent(Transform).position = new Vector3(0, 0, 1)
  // laptop.setParent(Attachable.FIRST_PERSON_CAMERA)
  laptop.setParent(Attachable.AVATAR)

  laptop.removeComponent(OnClickComponent)
})

laptop.addComponent(
  OnClickComponent
)

desk.addComponent(
  new OnClick(() => {
    laptop.setParent(null)
    laptop.getComponent(Transform).position = new Vector3(8, 1.5, 8)

    laptop.addComponent(
      OnClickComponent
    )
  })
)


