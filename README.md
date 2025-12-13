# Medical Conversation Assistant 🏥

A mobile application built with Expo that helps record and summarize doctor-patient conversations using speech-to-text and AI-powered summarization.

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [API Key Configuration](#-api-key-configuration)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- **Voice Recording**: High-quality audio recording for doctor-patient conversations
- **Speech-to-Text**: Automatic transcription using Google Speech-to-Text API
- **AI Summarization**: Intelligent conversation summary using Google Gemini AI
- **Structured Medical Information**: Extracts diagnosis, prohibitions, danger signs, diet advice, and follow-up information
- **Cross-platform**: Works on iOS, Android, and web

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo CLI** (will be installed via npx)
- **FFmpeg** (automatically installed via ffmpeg-static package)

For mobile testing:
- **Expo Go** app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- OR **Android Studio** for Android Emulator
- OR **Xcode** for iOS Simulator (macOS only)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd MT_final_project
```

### 2. Install Dependencies

Install the main app dependencies:

```bash
npm install
```

Install the backend server dependencies:

```bash
cd server
npm install
cd ..
```

## 🔑 API Key Configuration

This project requires Google API keys for Speech-to-Text and Gemini AI services.

### Step 1: Get Your API Keys

1. **Google Cloud API Key** (for Speech-to-Text):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the **Cloud Speech-to-Text API**
   - Go to **APIs & Services > Credentials**
   - Click **Create Credentials > API Key**
   - Copy your API key

2. **Gemini API Key** (for AI Summarization):
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click **Get API Key** or **Create API Key**
   - Copy your API key

### Step 2: Configure Environment Variables

1. In the project root directory, create a `.env` file:

```bash
# Copy the example file
cp env.example.txt .env
```

2. Open the `.env` file and fill in your API keys:

```env
# Google API Key for Speech-to-Text
EXPO_PUBLIC_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE

# STT Server URL
# For local development (emulator/simulator):
EXPO_PUBLIC_STT_SERVER_URL=http://localhost:3001/stt

# For physical device testing on the same Wi-Fi network:
# Replace 192.168.x.x with your computer's local IP address
# EXPO_PUBLIC_STT_SERVER_URL=http://192.168.x.x:3001/stt

# Gemini API Key (for backend summarization)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Gemini Model to use
GEMINI_MODEL=gemini-3.0-pro-preview
```

### Finding Your Local IP Address (for Physical Device Testing)

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your Wi-Fi adapter
```

**macOS/Linux:**
```bash
ifconfig
# Look for "inet" under your Wi-Fi interface (usually en0 or wlan0)
```

**Important Notes:**
- ⚠️ **Never commit the `.env` file to GitHub** - it's already in `.gitignore`
- 🔒 Keep your API keys secret and secure
- 📱 For physical device testing, your phone and computer must be on the **same Wi-Fi network**

## 🚀 Running the Project

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Start the Backend Server:**

```bash
cd server
npm run start
```

You should see:
```
[stt-server] Listening on http://localhost:3001
```

**Terminal 2 - Start the Expo App:**

```bash
# In the project root directory
npx expo start
```

### Option 2: Using npm-run-all (Alternative)

You can also create a script to run both servers simultaneously. Add this to your root `package.json`:

```json
"scripts": {
  "dev": "npm-run-all --parallel start server",
  "server": "cd server && npm start"
}
```

Then install npm-run-all:
```bash
npm install --save-dev npm-run-all
```

And run:
```bash
npm run dev
```

### Accessing the App

After starting Expo, you'll see a QR code and several options:

- **Press `a`** - Open in Android emulator
- **Press `i`** - Open in iOS simulator (macOS only)
- **Press `w`** - Open in web browser
- **Scan QR code** - Open in Expo Go app on your physical device

## 📁 Project Structure

```
MT_final_project/
├── app/                      # Main application code (Expo Router)
│   ├── (tabs)/              # Tab-based navigation screens
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal screens
├── components/              # Reusable React components
├── server/                  # Backend server for STT processing
│   ├── index.js            # Express server with STT and summarization endpoints
│   ├── package.json        # Server dependencies
│   └── node_modules/       # Server dependencies
├── assets/                  # Images, fonts, and other static files
├── constants/              # App constants and configuration
├── hooks/                  # Custom React hooks
├── .env                    # Environment variables (create this file)
├── env.example.txt         # Example environment variables
├── app.json               # Expo configuration
├── package.json           # Main app dependencies
└── README.md              # This file
```

## 🛠 Technologies Used

### Frontend
- **Expo** (~54.0.27) - React Native framework
- **React** (19.1.0) - UI library
- **React Native** (0.81.5) - Mobile framework
- **Expo Router** (~6.0.17) - File-based routing
- **Expo AV** (~16.0.8) - Audio recording and playback
- **React Navigation** - Navigation library

### Backend
- **Express** (^5.1.0) - Web server framework
- **Google Generative AI** (^0.24.1) - Gemini API client
- **FFmpeg** - Audio format conversion
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### APIs
- **Google Speech-to-Text API** - Voice transcription
- **Google Gemini API** - AI-powered summarization



### Getting Help

If you encounter other issues:
1. Check the terminal logs for error messages
2. Verify all dependencies are installed
3. Ensure API keys are valid and have the correct permissions
4. Try clearing caches and reinstalling dependencies

## 📝 Development Notes

### Audio Processing Flow

1. **Recording**: App records audio in high quality (m4a/AAC format)
2. **Upload**: Audio is converted to base64 and sent to the backend
3. **Conversion**: Backend uses FFmpeg to convert m4a to FLAC format
4. **Transcription**: FLAC audio is sent to Google Speech-to-Text API
5. **Summarization**: Transcribed text is processed by Gemini AI
6. **Display**: Structured medical information is returned to the app

### Environment Variables

- Variables prefixed with `EXPO_PUBLIC_` are accessible in the frontend
- Other variables (like `GEMINI_API_KEY`) are only used in the backend
- Never expose sensitive API keys in frontend code

## 📄 License

This project is created for educational purposes as part of the Multimedia Technology course at CCU.

---
