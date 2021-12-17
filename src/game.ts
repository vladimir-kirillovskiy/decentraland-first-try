
function spawnEntity(shape: Shape, position: Vector3, rotation?: Quaternion) {
  const entity = new Entity()
  
  entity.addComponent(new Transform({ position: position, rotation }))
  entity.addComponent(shape)
  engine.addEntity(entity)
  
  return entity
}

const arc = spawnEntity(new GLTFShape("models/Arc_big.glb"), new Vector3(32, 0, 16)) 
const scene = spawnEntity(new GLTFShape("models/Scene.glb"), new Vector3(8, -0.5, 16)) 