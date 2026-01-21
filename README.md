# React Native Intern Assignment – Music Player

## 👤 Student Details
- **Name:** Vaibhav Chauhan  
- **Roll No:** 2484200208  
- **Email:** vaibhav.chauhan_mca24@gla.ac.in  
- **Institute:** GLA University  

---

## 📱 Project Overview
This project is a **Music Player application** built using **React Native (Expo) with TypeScript**.  
It streams music using the **JioSaavn public API** and focuses on clean architecture, proper state management, and smooth audio playback.

---

## 🛠 Tech Stack
- **React Native (Expo)**
- **TypeScript**
- **React Navigation v6**
- **Zustand** (State Management)
- **Expo AV** (Audio Playback)
- **AsyncStorage** (Local Persistence)

---

## ✨ Features Implemented
- 🔍 Search songs using JioSaavn API  
- 📜 Infinite scroll (pagination)  
- ▶️ Play / Pause music  
- 🎧 Mini Player synced with Full Player  
- ⏩ Seek bar with current & total duration  
- 🔁 State sync across screens  
- 📱 Background playback support  

---

## 📂 Project Structure (High Level)
```
src/
 ├─ screens/
 │   ├─ HomeScreen.tsx
 │   ├─ FullPlayerScreen.tsx
 ├─ components/
 │   ├─ MiniPlayer.tsx
 ├─ store/
 │   ├─ playerStore.ts
 ├─ navigation/
 │   ├─ AppNavigator.tsx
```

---
APK LINK : https://expo.dev/accounts/vaibhav6398/projects/music-player/builds/02b07066-481f-474e-9afb-08aeb9e1c1cf  


## ▶️ Setup Instructions
```bash
npm install
npx expo start
```

Make sure Expo Go is installed on your device or emulator.

---

## 🔗 API Used
- **Base URL:** https://saavn.sumit.co/
- **Example:**  
  `GET /api/search/songs?query=arijit`

No API key required.

---

## 📦 Submission Includes
- ✅ GitHub Repository  
- ✅ APK Build  
- ✅ README.md  
- ✅ Demo Video (2–3 minutes)

---

## ⚖️ Trade-offs & Notes
- Offline download feature not implemented (bonus).
- Queue persistence kept minimal using AsyncStorage.
- Focused on clarity & functionality over heavy UI animations.

---

## 🎥 Demo
A short demo video showcasing search, playback, mini player sync, and background audio is included.

---

### ✅ Submitted as per assignment instructions
