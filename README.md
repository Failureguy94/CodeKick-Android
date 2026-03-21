# CodeKick Android

A **Kotlin Jetpack Compose** Android app that is a pixel-faithful port of the [CodeKick](https://codekick.dev) web application.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Kotlin |
| UI | Jetpack Compose + Material 3 |
| Navigation | Navigation Compose (mirrors all web routes) |
| Architecture | Single-Activity, MVVM + Hilt DI |
| Backend | Supabase (Auth, PostgREST, Edge Functions) |
| HTTP | Ktor OkHttp |
| Image Loading | Coil |

## Screen Structure (mirrors Web Routes)

```
/ → HomeScreen           (Hero + animated floating icons)
/auth → AuthScreen       (Sign In / Sign Up tabs)
/verify-phone            (OTP verification)
/profile                 (User settings, sign out)
/domains                 (4 animated flip cards)
/discover                (Learning path browser)
/dashboard               (Stats, recent topics, streak)
/learn                   (AI notes generator)
/my-topics               (Saved topics list)
/track                   (Activity heatmap + milestones)
/cp → CP track (Language → Level → Resources, Blogs)
/aiml → AIML track (Roadmap → Step → Research Papers)
/web3 → Web3 track + Market Insights
/web2 → Web2 full-stack curriculum
```

## Setup

1. **Clone the repo**
   ```bash
   git clone git@github.com:Failureguy94/CodeKick-Android.git
   cd CodeKick-Android
   ```

2. **Add Supabase credentials to `local.properties`**
   ```properties
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   sdk.dir=/path/to/Android/Sdk
   ```

3. **Add Inter font files** to `app/src/main/res/font/`:
   - `inter_light.ttf`
   - `inter_regular.ttf`
   - `inter_medium.ttf`
   - `inter_semibold.ttf`
   - `inter_bold.ttf`

   Download from [fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter)

4. **Build & Run**
   ```bash
   ./gradlew assembleDebug
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

## Features

- 🌙 Dark/light theme toggle (defaults to dark — same as web)
- 🔐 Username-based auth (`username@codekick.local` email trick)
- 🃏 Animated flip-card domain selection
- 🧠 AI notes generator (calls same Supabase Edge Function as web)
- 📊 Activity heatmap (Canvas-drawn — mirrors `ActivityHeatmap.tsx`)
- 🔥 Daily streak tracking
- 🤖 AI chatbot FAB (floating bottom-right)
- 📱 Bottom navigation with 5 main tabs
