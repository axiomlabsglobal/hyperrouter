# HyperRouter B2B SaaS

## Environment Variables (.env.local)

To run this project in a production environment with full Auth, DB, and Billing functionality, you must configure the following environment variables in your `.env.local` file:

```env
# 1. Database (Supabase / PostgreSQL)
# The full connection string for Prisma.
DATABASE_URL="postgresql://user:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. NextAuth & App Settings
# Generate a secret via: `openssl rand -base64 32`
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 3. Authentication Providers (Google/GitHub)
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
GITHUB_CLIENT_ID="your_github_oauth_client_id"
GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"

# 4. Billing (Lemon Squeezy)
LEMON_SQUEEZY_API_KEY="your_lemon_squeezy_api_key"
LEMON_SQUEEZY_STORE_ID="your_store_id"
LEMON_SQUEEZY_WEBHOOK_SECRET="your_webhook_signing_secret"
LEMON_SQUEEZY_PRO_VARIANT_ID="variant_id_for_pro_tier"
LEMON_SQUEEZY_ENTERPRISE_VARIANT_ID="variant_id_for_enterprise_tier"

# 5. Slack Integration (Optional for Alerting)
SLACK_CLIENT_ID="your_slack_oauth_client_id"
SLACK_CLIENT_SECRET="your_slack_oauth_client_secret"
```

*If the database or billing keys are missing during development, the application will automatically fallback to dummy endpoints to prevent crashes and allow UI testing.*
