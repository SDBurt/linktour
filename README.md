![LinkTour](/public/android-chrome-192x192.png)

# LinkTour

## Overview

This repository contains the code for LinkTour, an open source link in bio app largely based on the open source project [dub.sh](https://dub.sh) and Nextjs template [Taxonomy](https://github.com/shadcn/taxonomy/tree/main/app).

## Technologies

- React 18
- NextJS 13
- Clerk for user authentication and management
- Prisma with Planetscale
- Tinybird for real-time stats
- Shadcn's Radix components styled with TailwindCSS
- Stripe for subscriptions

## Setup

- clone the repository
- `npm install`
- copy `.env.example` to `.env` and fill in the blanks with your values
  - Create a Clerk account
    - Get keys for google and github
  - Create a planetscale account
  - Create a Tinybird account
    - Create pipelines for the different stat endpoints found in `@/lib/api/stats.ts` (`VALID_TINYBIRD_ENDPOINTS`)
  - Create a stripe account
