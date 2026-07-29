# 🚀 RAILWAY DEPLOYMENT - 5 MINUTES TO LIVE

## Why Railway?
- ✅ Built for Node.js Express apps (not just Next.js like Vercel)
- ✅ Auto-deploys on git push (same as GitHub Actions)
- ✅ Free tier includes custom domain
- ✅ Better performance for Bangladesh region
- ✅ Simpler setup for serverless apps

## Step-by-Step Deployment

### 1. Create Railway Account (1 min)
```
1. Go to https://railway.app
2. Click "Deploy Now"
3. Sign up with GitHub (easiest)
4. Authorize railway-app access to your GitHub account
```

### 2. Create New Project (1 min)
```
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Find "SYSmoAI/AI-Team-Premium"
4. Click "Deploy"
```

### 3. Configure Environment (1 min)
Railway should auto-detect:
- Framework: Node.js
- Build Command: `npm run build`
- Start Command: `npm start`

**Verify in Railway Dashboard:**
```
Settings > Build > Build Command: npm run build
Settings > Deploy > Start Command: npm start
```

### 4. Add Environment Variables (30 sec)
Copy from `.env` file:
```
Variables section in Railway dashboard:
- NODE_ENV=production
- DATABASE_URL=(if any)
- Any API keys from .env
```

### 5. Add Custom Domain (1 min)
```
1. Go to Project > Settings > Domains
2. Click "Add Domain"
3. Select "Custom Domain"
4. Enter: www.aiteampremium.com
5. Click "Add"

Railway will show DNS instructions:
- Nameservers to update (if registrar allows)
- OR CNAME record to point domain
```

### 6. Update DNS at Registrar (1 min)
```
Your domain registrar (where aiteampremium.com registered):
1. Go to DNS settings
2. Update nameservers OR add CNAME record per Railway instructions
3. Save changes

Note: DNS propagation can take 5-30 minutes
```

### 7. Test Live Deployment (1 min)
```bash
# Wait 5 minutes for DNS propagation, then test:
curl -I https://www.aiteampremium.com

# Expected response:
HTTP/2 200
Content-Type: text/html

# Visit in browser:
https://www.aiteampremium.com
```

## Success Checklist
- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] Build succeeds (watch deployment logs)
- [ ] Start command configured
- [ ] Environment variables set
- [ ] Custom domain added
- [ ] DNS updated at registrar
- [ ] Site live at www.aiteampremium.com

## Troubleshooting

### Build Fails
```
Check Railway logs:
1. Dashboard > Deployments > Latest
2. Click "View Logs"
3. Look for npm build errors
4. Usually: missing dependencies or type errors
```

### Site Shows 502 Error
```
App crashed. Check:
1. Railway Logs for crash reason
2. Usually: npm start command wrong or missing port
3. Our app listens on PORT env var (default 3000)
```

### Domain Shows Old Version
```
DNS still propagating:
- Wait up to 30 minutes
- OR: manually update DNS faster
- Test with: nslookup www.aiteampremium.com
```

## After Deploy - Continuous Deployment

Railway auto-deploys on every git push:
```bash
1. Make code changes
2. git add .
3. git commit -m "your message"
4. git push origin main

→ GitHub notifies Railway
→ Railway auto-builds and deploys
→ www.aiteampremium.com updates automatically
```

## Next: GitHub Actions Setup

Once live on Railway, enable continuous deployment:
1. GitHub Actions CI tests every PR
2. Manual approval for production deploy
3. Auto-rollback on test failure

See: COMPLETE_ROADMAP.md > PHASE 7

---

**Status:** Ready to deploy
**Time to live:** 5-10 minutes
**Cost:** Free tier ($0/month)

Deploy now! 🚀
