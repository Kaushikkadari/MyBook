# Vercel Deployment Guide

This guide will help you deploy your Django Book Website to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but recommended)
3. Git repository with your code

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     SECRET_KEY=your-secure-secret-key-here
     DEBUG=False
     ```
   - To generate a secure SECRET_KEY, run:
     ```python
     python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add SECRET_KEY
   vercel env add DEBUG
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Notes

### Database Considerations

⚠️ **Important**: SQLite databases are **ephemeral** on Vercel (they reset on each deployment).

For a production site, consider:
- **Option 1**: Use a cloud database (PostgreSQL, MySQL)
  - [Supabase](https://supabase.com/) (Free PostgreSQL)
  - [PlanetScale](https://planetscale.com/) (Free MySQL)
  - [Railway](https://railway.app/) (PostgreSQL/MySQL)

- **Option 2**: Keep SQLite for static content
  - Since your app uses hardcoded content in views (no database operations), it works fine!
  - Admin panel won't persist data between deployments

### Static Files

✅ Static files are handled by WhiteNoise (already configured)
✅ CSS, JavaScript, and images will work correctly

### Admin Panel

The Django admin panel will work, but:
- You need to create a superuser locally
- Or use a persistent database solution

To create a superuser (if using persistent DB):
```bash
python manage.py createsuperuser
```

## Configuration Files Created

The following files have been created for Vercel deployment:

1. **vercel.json** - Vercel configuration
2. **build.sh** - Build script for collecting static files
3. **.vercelignore** - Files to ignore during deployment
4. **.env.example** - Environment variables template

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `requirements.txt`

### Static Files Not Loading
- Run `python manage.py collectstatic` locally to test
- Check browser console for errors
- Verify STATIC_URL path matches your Vercel deployment

### 500 Internal Server Error
- Check Vercel function logs
- Ensure DEBUG=False in production
- Verify environment variables are set correctly

### CSRF Errors
- Add your Vercel domain to ALLOWED_HOSTS in settings.py
- Example: `ALLOWED_HOSTS = ['your-project.vercel.app', 'localhost']`

## Custom Domain

To add a custom domain:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update ALLOWED_HOSTS in settings.py

## Updates and Redeployment

Vercel automatically redeploys when you push to your connected Git repository:

```bash
git add .
git commit -m "Update site"
git push
```

## Performance Optimization

✅ Already configured:
- WhiteNoise for compressed static files
- Efficient static file serving
- Optimized images

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Django on Vercel Guide](https://vercel.com/guides/deploying-django-with-vercel)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Your Site is Ready! 🚀

Your Django book website is now configured for Vercel deployment with:
- ✅ Proper static file handling
- ✅ Environment variable support
- ✅ Production-ready configuration
- ✅ Beautiful thought bubble quotes
- ✅ Responsive design

Happy Deploying! 🎉


















