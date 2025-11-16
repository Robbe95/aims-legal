import { QUEUES } from '@payload/jobs/queues'
import { getPayload } from '@payload/utils/payload/getPayload.util'

export async function createExampleJob({
  title,
}: { title: string }) {
  const payload = await getPayload()

  await payload.jobs.queue({
    input: {
      title,
    },
    queue: QUEUES.DEFAULT_QUEUE,
    workflow: 'exampleWorkflow',
  })
}
