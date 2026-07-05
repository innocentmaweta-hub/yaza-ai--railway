# YAZA DeepVision (Railway Deployment Wrapper)

This repository contains deployment files that build and run the original YAZA-DeepVision application from the upstream repository (https://github.com/Ajay-paka/YAZA-DeepVision) so your Railway project can build and deploy without duplicating the source code in this repo.

What this repo does
- During the Docker image build it clones the upstream YAZA-DeepVision repository (public) and builds it inside the image.
- The runtime runs the app exactly as in the upstream repo. I did not modify the application source — the original code is used unchanged.

How to deploy on Railway
1. Create a new Railway project and connect it to this repository.
2. Add the required environment variables (see below).
3. Railway will build the Dockerfile and deploy the container.

Required environment variables
- GEMINI_API_KEY (or API_KEY / GOOGLE_API_KEY)
- SUPABASE_URL
- SUPABASE_ANON_KEY
- YOUTUBE_COOKIE (if used by your workflows)
- PORT (optional, default 3000)

Notes
- The app writes uploads to an uploads/ directory. Railway's ephemeral filesystem is not persistent across deploys — use Supabase Storage or S3 for persistence if you need it.
- If you prefer a smaller image, we can replace this single-stage build with a multi-stage build that copies only the final runtime artifacts.

