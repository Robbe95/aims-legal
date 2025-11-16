/* eslint-disable node/prefer-global/process */
/* eslint-disable no-new */

import { QUEUES } from '@payload/jobs/queues'
import config from '@payload-config'
import { Cron } from 'croner'
import { getPayload } from 'payload'

async function runBinScript() {
  const payload = await getPayload({
    config,
  })

  const DEFAULT_LIMIT = 10
  const queue = QUEUES.DEFAULT_QUEUE
  const HANDLE_SCHEDULES = true
  const ALL_QUEUES = false

  if (HANDLE_SCHEDULES) {
    await payload.jobs.handleSchedules({
      allQueues: ALL_QUEUES,
      queue,
    })
  }

  await payload.jobs.run({
    allQueues: ALL_QUEUES,
    limit: DEFAULT_LIMIT,

    queue,
  })

  return {
    payload,
  }
}

const JOB_TIMEOUT_BUFFER_IN_MS = 60_000

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Job timed out after 60 seconds')), ms))
}

export async function bin() {
  const payload = await getPayload({
    config,
  })

  new Cron(
    `*/1 * * * * *`,
    async () => {
      try {
        await Promise.race([
          runBinScript(),
          timeout(JOB_TIMEOUT_BUFFER_IN_MS),
        ])
      }
      catch (error) {
        // if this happens, clear all processing jobs

        await payload.update({
          collection: 'payload-jobs',
          data: {
            processing: false,
          },
          depth: 0,
          where: {
            and: [
              {
                processing: {
                  equals: true,
                },
              },
            ],
          },
        })
        console.error('Cron job failed', error)
      }
    },
    {
      // Do not run consecutive crons if previous crons still ongoing
      protect: true,

    },
  )

  process.stdin.resume() // Keep the process alive
}

bin()
