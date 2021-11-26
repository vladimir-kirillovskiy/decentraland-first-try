function spawnEntity(shape: Shape, x: number, y: number, z: number, rotation?: Quaternion) {
  const entity = new Entity()
  entity.addComponent(new Transform({ position: new Vector3(x, y, z), rotation }))
  entity.addComponent(shape)
  engine.addEntity(entity)
  return entity
}

const moveBoxEntity = spawnEntity(new GLTFShape("models/coin.glb"), 3, 1, 3)