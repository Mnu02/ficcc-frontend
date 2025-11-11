# FICCC Frontend

A React Native mobile app built with Expo Go for iOS and Android development.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo Go mobile app** - Install from your device's app store:
  - iOS: [App Store](https://apps.apple.com/us/app/expo-go/id1223766402)
  - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ficcc-frontend
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter peer dependency warnings, you can safely ignore them. The `--legacy-peer-deps` flag was already used during initial setup.

### 3. Start the Development Server

```bash
npm start
```

You should see output like:
```
Starting project at /path/to/ficcc-frontend
Starting Metro Bundler
Waiting on http://localhost:8081
```

### 4. Connect Your Device

#### Option A: Scan QR Code (Easiest)

1. Open **Expo Go** on your phone
2. In your terminal, a **QR code** will be displayed
3. **iPhone**: Use the built-in camera app to scan, then tap the Expo notification
4. **Android**: Open Expo Go and tap the QR code scanner button to scan

Your app should load in 10-30 seconds depending on your internet connection.

#### Option B: Manual Connection

If the QR code doesn't work:

1. Make sure your phone is on the same WiFi network as your computer
2. In Expo Go, tap "Scan QR code" and manually scan the code from your terminal
3. Or, type the connection URL from your terminal into Expo Go

### 5. Reload Your App

After making code changes, your app will hot-reload automatically. If it doesn't:

- **iPhone**: Shake your device
- **Android**: Shake your device or press the menu button and select "Reload"
- **Terminal**: Press `r` to reload, `w` to toggle Web preview

## Project Structure

```
ficcc-frontend/
├── src/
│   ├── App.tsx                    # Main app entry point
│   ├── screens/
│   │   └── HomeScreen.tsx         # Home screen component
│   ├── components/                # Reusable components
│   │   └── .gitkeep
│   ├── assets/                    # Images, icons, fonts
│   │   └── .gitkeep
│   ├── utils/                     # Helper functions
│   │   └── .gitkeep
│   └── types/                     # TypeScript interfaces
│       └── .gitkeep
├── App.tsx                        # Root entry point (imports from src/App.tsx)
├── app.json                       # Expo configuration
├── babel.config.js                # Babel configuration
├── metro.config.js                # Metro bundler configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## Development Workflow

### Making Changes

1. Edit any `.tsx` or `.ts` files
2. Save the file
3. Your changes automatically reload on your device

### Adding New Screens/Components

Create a new file, for example `src/screens/ProfileScreen.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ProfileScreen;
```

Import it in `src/App.tsx`:

```typescript
import ProfileScreen from './screens/ProfileScreen';
```

Or create reusable components in `src/components/Button.tsx`:

```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
```

### Installing New Packages

```bash
npm install <package-name>
```

For packages with native code, you may need to clear your Expo cache and restart:

```bash
npm install <package-name>
npm start -- --clear
```

## Troubleshooting

### "Port 8081 is already in use"

Kill the existing process:

```bash
# macOS/Linux
lsof -i :8081 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

Then restart: `npm start`

### App shows red error screen

1. Check your terminal for error messages
2. Make sure all imports are correct
3. Clear Metro cache: `npm start -- --clear`

### Blank white screen on device

1. Shake your device to open the dev menu
2. Tap "Reload"
3. If still blank, close Expo Go and rescan the QR code

### Module not found errors

Make sure you've installed all dependencies:

```bash
npm install
```

If you're still getting errors:

```bash
rm -rf node_modules package-lock.json
npm install
npm start -- --clear
```

### Connection timeout or can't find dev server

1. Verify you're on the same WiFi network as your computer
2. Check your computer's firewall isn't blocking port 8081
3. Restart Expo: `npm start`

## Dependencies

- **React Native 0.81.5** - Mobile app framework
- **React 19.1.0** - UI library
- **Expo 54.0.0** - Development and deployment platform
- **TypeScript** - Type safety

## Scripts

```bash
npm start        # Start Expo development server
npm run android  # Run on Android emulator/device
npm run ios      # Run on iOS simulator
npm run web      # Run in web browser
```

## Team Development

When working as a team:

1. Always pull the latest changes before starting work: `git pull origin main`
2. Create a feature branch: `git checkout -b feature/your-feature`
3. After making changes, commit and push: `git add . && git commit -m "message" && git push origin feature/your-feature`
4. Create a pull request on GitHub for code review

## Common Issues for Team Members

**Issue**: Different Expo SDK versions
**Solution**: Always run `npm install` after pulling changes

**Issue**: "Invariant Violation" errors
**Solution**: Clear cache and reinstall: `rm -rf node_modules && npm install && npm start -- --clear`

**Issue**: Hot reload not working
**Solution**: Close Expo Go, clear your terminal cache, and rescan the QR code

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Documentation](https://react.dev/)

## Support

If you encounter issues:

1. Check this README's troubleshooting section
2. Check your terminal for error messages
3. Review the official Expo docs: https://docs.expo.dev/
4. Ask your team members
