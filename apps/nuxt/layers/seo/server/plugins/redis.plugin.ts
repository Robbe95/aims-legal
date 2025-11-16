import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()

  const storage = useStorage()

  const driver = redisDriver({
    base: 'redis',
    db: runtimeConfig.redisDb,
    host: runtimeConfig.redisHost,
    port: runtimeConfig.redisPort,
    ttl: 60 * 60 * 24 * 7, // 7 days
  })

  storage.mount('redis', driver)

  const redisStorage = useStorage('redis')

  await redisStorage.clear()
})
