
// PayloadCMS Configuration
// File: payload.config.ts

import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Global Goods Platform',
      favicon: '/favicon.ico',
    },
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!, // Supabase connection string
    },
  }),
  collections: [
    // Global Goods Collection
    {
      slug: 'global-goods',
      admin: {
        defaultColumns: ['name', 'type', 'updatedAt'],
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'primaryFunctionality',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'users',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'inceptionYear',
          type: 'number',
        },
        {
          name: 'sizeOfCommunity',
          type: 'number',
        },
        {
          name: 'numberOfImplementations',
          type: 'number',
        },
        // Website links group
        {
          name: 'websites',
          type: 'group',
          fields: [
            {
              name: 'main',
              type: 'text',
              label: 'Main Website',
            },
            {
              name: 'docs',
              type: 'text',
              label: 'Documentation',
            },
            {
              name: 'sourceCode',
              type: 'text',
              label: 'Source Code',
            },
            {
              name: 'demo',
              type: 'text',
              label: 'Demo',
            },
          ],
        },
        // License relationship
        {
          name: 'license',
          type: 'relationship',
          relationTo: 'licenses',
        },
        // Types relationship
        {
          name: 'types',
          type: 'relationship',
          relationTo: 'global-good-types',
          hasMany: true,
        },
        // Languages relationship
        {
          name: 'languages',
          type: 'relationship',
          relationTo: 'languages',
          hasMany: true,
        },
        // Classifications relationship
        {
          name: 'classifications',
          type: 'relationship',
          relationTo: 'classifications',
          hasMany: true,
        },
        // Standards relationships
        {
          name: 'healthStandards',
          type: 'relationship',
          relationTo: 'standards',
          hasMany: true,
          filterOptions: {
            domain: {
              equals: 'Health',
            },
          },
        },
        {
          name: 'interoperabilityStandards',
          type: 'relationship',
          relationTo: 'standards',
          hasMany: true,
          filterOptions: {
            type: {
              equals: 'exchange',
            },
          },
        },
        {
          name: 'climateStandards',
          type: 'relationship',
          relationTo: 'standards',
          hasMany: true,
          filterOptions: {
            domain: {
              equals: 'Weather and Climate',
            },
          },
        },
        // Implementation countries
        {
          name: 'implementationCountries',
          type: 'relationship',
          relationTo: 'countries',
          hasMany: true,
        },
        // Screenshots
        {
          name: 'screenshots',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
        },
        // Contacts
        {
          name: 'contacts',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'role',
              type: 'text',
            },
          ],
        },
        // Community section
        {
          name: 'community',
          type: 'group',
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
            },
            {
              name: 'hostOrganization',
              type: 'relationship',
              relationTo: 'organizations',
            },
            {
              name: 'communityUrl',
              type: 'text',
            },
            {
              name: 'mailingListUrl',
              type: 'text',
            },
            {
              name: 'eventsDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'eventsScheduleUrl',
              type: 'text',
            },
          ],
        },
        // Policies section
        {
          name: 'policies',
          type: 'group',
          fields: [
            {
              name: 'governanceUrl',
              type: 'text',
            },
            {
              name: 'termsOfUseUrl',
              type: 'text',
            },
            {
              name: 'userAgreementUrl',
              type: 'text',
            },
            {
              name: 'privacyPolicyUrl',
              type: 'text',
            },
            {
              name: 'doNoHarmUrl',
              type: 'text',
            },
            {
              name: 'piiCollectedUrl',
              type: 'text',
            },
            {
              name: 'npiiUsedUrl',
              type: 'text',
            },
          ],
        },
        // Events
        {
          name: 'events',
          type: 'array',
          fields: [
            {
              name: 'eventName',
              type: 'text',
              required: true,
            },
            {
              name: 'eventDate',
              type: 'date',
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        // Maturity scores
        {
          name: 'maturityScores',
          type: 'array',
          fields: [
            {
              name: 'year',
              type: 'number',
              required: true,
            },
            {
              name: 'globalUtility',
              type: 'number',
              min: 0,
              max: 10,
            },
            {
              name: 'communitySupport',
              type: 'number',
              min: 0,
              max: 10,
            },
            {
              name: 'maturityOfGG',
              type: 'number',
              min: 0,
              max: 10,
            },
            {
              name: 'inclusiveDesign',
              type: 'number',
              min: 0,
              max: 10,
            },
            {
              name: 'climateResilience',
              type: 'number',
              min: 0,
              max: 10,
            },
            {
              name: 'lowCarbon',
              type: 'number',
              min: 0,
              max: 10,
            },
          ],
        },
        // Resources
        {
          name: 'resources',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                'Articles',
                'ProductDocumentation',
                'UserRequirements',
                'EndUserDocumentation',
                'ImplementerDocumentation',
                'DeveloperDocumentation',
                'OperatorDocumentation',
                'InstallationDocumentation',
              ],
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        // Key Funders/Supporters
        {
          name: 'funders',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
        // Additional text fields
        {
          name: 'reachSummary',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'maturitySummary',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'climateIntegration',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'inclusiveDesign',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'environmentalImpact',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'sustainability',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'tcoDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'tcoUrl',
          type: 'text',
        },
      ],
    },
    
    // Use Cases Collection
    {
      slug: 'use-cases',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'purpose',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'scope',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'actors',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'preconditions',
          type: 'richText',
          localized: true,
        },
        {
          name: 'processSteps',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'postconditions',
          type: 'richText',
          localized: true,
        },
        {
          name: 'dataRequirements',
          type: 'richText',
          localized: true,
        },
        {
          name: 'technologyComponents',
          type: 'richText',
          localized: true,
        },
        {
          name: 'challenges',
          type: 'richText',
          localized: true,
        },
        {
          name: 'sustainabilityConsiderations',
          type: 'richText',
          localized: true,
        },
        {
          name: 'globalGoods',
          type: 'relationship',
          relationTo: 'global-goods',
          hasMany: true,
        },
        {
          name: 'classifications',
          type: 'relationship',
          relationTo: 'classifications',
          hasMany: true,
        },
        {
          name: 'standards',
          type: 'relationship',
          relationTo: 'standards',
          hasMany: true,
        },
      ],
    },

    // Reference Collections
    {
      slug: 'global-good-types',
      admin: {
        useAsTitle: 'code',
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },

    {
      slug: 'classifications',
      admin: {
        useAsTitle: 'code',
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'authority',
          type: 'select',
          options: ['SDG', 'WHO', 'WMO', 'DPI'],
          required: true,
        },
        {
          name: 'groupCode',
          type: 'text',
        },
        {
          name: 'groupName',
          type: 'text',
        },
      ],
    },

    {
      slug: 'standards',
      admin: {
        useAsTitle: 'code',
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'domain',
          type: 'select',
          options: ['Health', 'Weather and Climate', 'Technology'],
          required: true,
        },
        {
          name: 'type',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },

    {
      slug: 'countries',
      admin: {
        useAsTitle: 'isoCode',
      },
      fields: [
        {
          name: 'isoCode',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'type',
          type: 'text',
          defaultValue: 'Country',
        },
        {
          name: 'shortName',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'formalName',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },

    {
      slug: 'languages',
      admin: {
        useAsTitle: 'code',
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'nativeName',
          type: 'text',
          required: true,
        },
      ],
    },

    {
      slug: 'licenses',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'licenseId',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    {
      slug: 'organizations',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'countries',
          type: 'relationship',
          relationTo: 'countries',
          hasMany: true,
        },
      ],
    },

    // Media collection
    {
      slug: 'media',
      upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },

    // Users collection (for admin)
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  localization: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    fallback: true,
  },
});
