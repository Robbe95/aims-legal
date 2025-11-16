/* eslint-disable perfectionist/sort-objects */
/* eslint-disable node/prefer-global/process */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { collections } from '@payload/collections/collections'
import globals from '@payload/globals/globals'
import { QUEUES } from '@payload/jobs/queues'
import { tasks } from '@payload/jobs/tasks/tasks'
import { workflows } from '@payload/jobs/workflows/workflows'
import { migrations } from '@payload/migrations'
import { setCollectionGroups } from '@payload/payload.nav'
import { plugins } from '@payload/plugins'
import { runSeeders } from '@payload/seeders/seeders'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import {
  DEFAULT_LOCALE,
  LOCALES,
} from '@repo/constants'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import { nl } from 'payload/i18n/nl'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  globals: setCollectionGroups(globals),
  serverURL: process.env.CMS_BASE_URL ?? 'http://localhost:5173',
  collections: setCollectionGroups(collections),
  admin: {
    components: {
      providers: [
        '@payload/components/providers/ClipboardSanitizerProvider#ClipboardSanitizerProvider',
      ],
      graphics: {
        Icon: '/components/logo/Logo#Icon',
        Logo: '/components/logo/Logo#Logo',
      },
      // Nav: '@payload/components/nav/Nav#DefaultNav',
      afterLogin: [
        '@payload/components/auth/LoginButton',
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  csrf: [
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:3000',
  ],

  routes: {
    admin: '/',
  },
  db: postgresAdapter({
    idType: 'uuid',
    prodMigrations: migrations,
    schemaName: 'payload',
    push: false,
    pool: {
      keepAlive: false,
      max: 3,
      min: 0,
      keepAliveInitialDelayMillis: 10_000,
      connectionTimeoutMillis: 5000, // 5 seconds to establish connection
      idleTimeoutMillis: 5000, // 30 seconds before closing idle connections
      query_timeout: 60_000, // 20 seconds for query timeout
      allowExitOnIdle: true,

      connectionString: process.env.POSTGRES_URI ?? '',
    },
  }),

  editor: lexicalEditor({

    features: () => [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      ParagraphFeature(),
      HeadingFeature({
        enabledHeadingSizes: [
          'h1',
          'h2',
          'h3',
        ],
      }),
      AlignFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      BlockquoteFeature(),
      UploadFeature(),
      HorizontalRuleFeature(),
      FixedToolbarFeature(),
    ],

  }),
  i18n: {
    supportedLanguages: {
      en,
      nl,
    },
  },
  localization: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES as unknown as string[],
  },
  plugins: [
    ...plugins,

  ],
  jobs: {
    tasks: [
      ...tasks,
    ],
    workflows,
    deleteJobOnComplete: true,
    autoRun: [
      {
        cron: '*/1 * * * * *', // Runs every minute
        limit: 15, // limit jobs to process each run
        queue: QUEUES.DEFAULT_QUEUE, // name of the queue
      },
    ],

    shouldAutoRun: () => {
      console.log('Checking if should auto run jobs...')

      if (process.env.IS_JOB !== 'TRUE') {
        return false
      }

      return true
    },
  },
  secret: process.env.PAYLOAD_SECRET ?? '',
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(`${dirname}/../../../packages/payload-types/src`, 'payload-types.d.ts'),
  },
  onInit() {
    if (process.env.IS_JOB === 'TRUE') {
      return
    }

    runSeeders()
  },

})
