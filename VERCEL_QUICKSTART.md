# 🚀 Vercel Deployment - Quick Start

## Step 1: Generate Secret Key

Run this command to generate a secure SECRET_KEY:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output - you'll need it for Vercel.

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Deploy to Vercel"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will auto-detect the settings
5. Add Environment Variables:
   - `SECRET_KEY` = (paste your generated key)
   - `DEBUG` = `False`
6. Click "Deploy"

## Step 4: Done! 🎉

Your site will be live at: `https://your-project-name.vercel.app`

## Important: Database Note

⚠️ Your app works perfectly without a persistent database because all content is hardcoded in views!

If you want to use the admin panel in production, you'll need a cloud database (see DEPLOYMENT.md for options).

## Test Your Site

After deployment, check:
- ✅ Homepage loads
- ✅ Images display
- ✅ Thought bubbles appear
- ✅ Navigation works
- ✅ Quote carousel animates
- ✅ Responsive on mobile

---

**Need detailed instructions?** See `DEPLOYMENT.md`

**Issues?** See `DEPLOYMENT_CHECKLIST.md`














