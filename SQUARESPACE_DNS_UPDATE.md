# 🔧 SQUARESPACE DNS UPDATE - 3 MINUTES TO LIVE

**Goal:** Make www.aiteampremium.com point to Vercel (where the live site is)

---

## ⚡ QUICK STEPS (DO THIS NOW)

### Step 1: Log into Squarespace
- Go to https://www.squarespace.com/login
- Use your credentials (you mentioned you're logged in)
- Navigate to **Settings → Domains**

### Step 2: Find aiteampremium.com
- Click on **aiteampremium.com** in the domains list
- Go to **DNS Settings** (or **Advanced** section)

### Step 3: Update DNS Records

**FOR www.aiteampremium.com (RECOMMENDED):**

1. Find or create a **CNAME** record for **www**
   - Name: `www`
   - Type: `CNAME`
   - Value: `cname.vercel.sh`
   - TTL: 300 (default)

2. Click **Save** or **Update**

**FOR aiteampremium.com (root domain):**

1. Find or create an **A** record for **@** (root)
   - Name: `@`
   - Type: `A`
   - Value: `76.76.19.165`
   - TTL: 300

2. Click **Save** or **Update**

---

## ✅ VERIFICATION (After 5 min)

Once DNS updates propagate (5-30 min), test:

```bash
# Test DNS resolution
nslookup www.aiteampremium.com

# Should show Vercel IP (76.76.21.* range)
```

Or simply visit: **https://www.aiteampremium.com** in browser

Expected: ✅ Loads homepage with all products

---

## 🆘 TROUBLESHOOTING

### "Old page still showing"
- DNS cache takes 5-30 minutes to clear
- Try: Ctrl+Shift+Delete to clear browser cache
- Or: Open in incognito/private window

### "Can't find DNS settings in Squarespace"
- Go to: Settings → Domains → Your Domain → DNS
- Or: Contact Squarespace support (they handle DNS)

### "Still showing old IP after 30 min"
- Verify DNS records saved correctly
- Check Squarespace dashboard confirms CNAME added
- Try: Flush DNS cache (see notes below)

---

## 📝 SQUARESPACE DNS NOTES

**Important:** Squarespace DNS interface:
- May show "Parked domain" status (OK - means custom DNS)
- CNAME should point to: `cname.vercel.sh`
- TTL defaults to 300 seconds (fine)
- Changes take 5-30 min to propagate globally

---

## 🔄 DNS PROPAGATION TIMELINE

```
Immediately:  DNS record saved in Squarespace
5 min:        Local ISP DNS starts seeing new record
15 min:       Most ISPs updated
30 min:       Worldwide propagation (guaranteed)
```

**You can start testing after 5 minutes.**

---

## 🎯 WHAT HAPPENS AFTER DNS UPDATES

```
1. User visits www.aiteampremium.com
2. Browser queries DNS
3. Squarespace resolves to Vercel (cname.vercel.sh)
4. Vercel serves your Express app
5. App returns HTML with all 56 products
6. User sees: www.aiteampremium.com in address bar
7. All 62 routes work
8. WhatsApp integration live
9. HTTPS/SSL automatic (Vercel handles)
```

---

## ✨ FINAL CHECK

After DNS updates propagate:

```bash
# Should work:
https://www.aiteampremium.com          ✅ Homepage
https://www.aiteampremium.com/all-products   ✅ All products
https://www.aiteampremium.com/pricing        ✅ Pricing
https://www.aiteampremium.com/chatgpt-plans  ✅ ChatGPT plans
https://www.aiteampremium.com/tools/claude   ✅ Claude tool page
```

---

## 🎉 YOU'RE DONE!

Once DNS propagates:
- ✅ www.aiteampremium.com LIVE
- ✅ All 56 AI products accessible
- ✅ All routes working
- ✅ Auto-deploys on git push (via Vercel)
- ✅ SSL/HTTPS automatic
- ✅ Zero manual intervention needed

**Timeline:**
- DNS update: 5 minutes (you do this now)
- DNS propagation: 5-30 minutes (automatic)
- Total: LIVE in 30 minutes max

---

**Status: Ready to update DNS**
**Next action: Update Squarespace DNS with CNAME records above**
**Expected: www.aiteampremium.com LIVE in 30 minutes**

