This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scheduling Toggle

Scheduling buttons are hidden by default.

- Turn scheduling on by setting: `NEXT_PUBLIC_ENABLE_SCHEDULING=true`
- Leave unset (or set to `false`) to keep `New Patient` / `Existing Patient` buttons hidden
- Optional booking links:
  - `NEXT_PUBLIC_NEW_PATIENT_SCHEDULE_URL`
  - `NEXT_PUBLIC_EXISTING_PATIENT_SCHEDULE_URL`
- Optional office details shown on `/schedule`:
  - `NEXT_PUBLIC_OFFICE_PHONE`
  - `NEXT_PUBLIC_OFFICE_EMAIL`
  - `NEXT_PUBLIC_OFFICE_LOCATION`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production Safety Checklist

- Use a business Google Workspace or booking provider account (not personal accounts).
- Do not collect diagnosis or treatment details in website forms.
- Use separate booking flows for `New Patient` and `Existing Patient`.
- Keep secrets in environment variables only (`.env.local`), never in source files.
- Require HTTPS on production and keep security headers enabled in `next.config.ts`.
- Enable hosting platform protections (WAF / bot protection / rate limiting).
- Enable uptime alerts and error monitoring before public launch.
- Review user permissions for front-desk staff quarterly.
