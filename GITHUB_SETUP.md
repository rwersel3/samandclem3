# How to Push to GitHub - Step by Step

## Step 1: Set Up Git (First Time Only)

Replace with YOUR email and name:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

## Step 2: Commit Your Code

```bash
git commit -m "Initial commit: Sam & Clem interactive storybook"
```

## Step 3: Connect to Your GitHub Repository

After creating a repository on GitHub (named something like `sam-and-clem-storybook`), run:

**Replace `YOUR-USERNAME` with your actual GitHub username:**

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sam-and-clem-storybook.git
git push -u origin main
```

### Example:
If your GitHub username is `johndoe` and you named the repo `storybook`:
```bash
git remote add origin https://github.com/johndoe/storybook.git
git push -u origin main
```

## Step 4: Enter Your Credentials

When you run `git push`, you'll be asked for:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your password)

### How to Create a Personal Access Token:

1. Go to GitHub.com → Click your profile picture → Settings
2. Scroll down to **Developer settings** (left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name: "Sam & Clem Storybook"
6. Check the box: **repo** (full control of private repositories)
7. Click **Generate token**
8. **COPY THE TOKEN** (you can't see it again!)
9. Use this token as your password when pushing

## Alternative: Use GitHub Desktop (Easier!)

If the command line feels confusing:

1. Download **GitHub Desktop** from [desktop.github.com](https://desktop.github.com)
2. Sign in with your GitHub account
3. Click **"Add"** → **"Add existing repository"**
4. Select your project folder
5. Click **"Publish repository"**
6. Done! No command line needed!

## After Pushing to GitHub

Once your code is on GitHub, you can:

1. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Deploy!

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Deploy!

Both are **completely free** and your storybook will be live in minutes!

## Quick Reference

```bash
# Check what's staged
git status

# Add all files
git add .

# Commit with a message
git commit -m "Your message here"

# Push to GitHub
git push

# See your commit history
git log --oneline
```

## Troubleshooting

**"Permission denied"**: Use a Personal Access Token instead of your password

**"Repository not found"**: Check that the URL matches your GitHub repo exactly

**"Updates were rejected"**: Someone else pushed changes. Run `git pull` first, then `git push`

## Need Help?

GitHub Desktop is much easier than the command line for beginners. I highly recommend it!
