📝 Secured TODO App – React Native (Bare) + Expo Local Authentication

📌 Overview
This project implements a secured TODO list application using a Bare React Native + Expo workflow, where all critical state mutations (Add / Update / Delete) are protected using device-level authentication.

Authentication is enforced using the Expo Local Authentication module, ensuring that users must verify their identity before modifying the TODO list.

🔐 Authentication Strategy
All TODO mutations are protected using:
- Biometric Authentication (Fingerprint / Face)
- Device Credentials (PIN / Pattern / Password fallback)

Instead of enforcing authentication at the UI layer, authentication is implemented at the service layer, ensuring that:
- State mutation cannot bypass authentication
- Business logic remains platform-safe
- Security is enforced regardless of UI interaction

Mutation Flow:
UI -> Secure Service -> Auth Guard -> Redux Dispatch -> Reducer Mutation
This approach ensures enterprise-grade mutation protection.

🧱 Architecture
The application follows a Feature-First Modular Architecture with clear separation of concerns:

```text
src
 ┣ app (Redux Store)
 ┣ core
 ┃ ┣ auth (Biometric Service)
 ┃ ┣ guard (Mutation Guard)
 ┃ ┗ storage (Secure Storage Wrapper)
 ┣ features
 ┃ ┗ todo
 ┃    ┣ slice
 ┃    ┣ service
 ┃    ┣ persistence
 ┃    ┗ screen
 ┣ navigation
 ┗ hooks
```

| Layer   | Responsibility               |
| ------- | ---------------------------- |
| UI      | Presentation only            |
| Service | Auth-protected mutation      |
| Guard   | Authentication enforcement   |
| Reducer | Pure state mutation          |
| Storage | Secure encrypted persistence |

🗂 State Management
Redux Toolkit is used for:
- Predictable mutation flow
- Scalable state management
- Middleware-friendly architecture
- Testable async logic
Reducers are kept pure with all side effects handled in the service layer.

🔒 Secure Persistence
TODOs are securely persisted using: **expo-secure-store**

This ensures:
- Encrypted storage using Android Keystore / iOS Keychain
- Protection against plaintext storage
- Secure state rehydration on app restart

Persistence Flow:
Redux State -> Serialize -> SecureStore
App Launch -> Load -> Rehydrate Redux

🧪 Unit Testing
Unit tests are implemented using:
- **Jest**
- **jest-expo**

The authentication service is mocked during testing to:
- Avoid dependency on native modules
- Isolate business logic
- Validate mutation dispatch after authentication

Tested:
Auth-protected mutation service

📦 Third Party Modules Used
| Module                    | Purpose                     |
| ------------------------- | --------------------------- |
| expo-local-authentication | Device-level authentication |
| expo-secure-store         | Encrypted storage           |
| @reduxjs/toolkit          | State management            |
| react-navigation          | Navigation                  |
| jest-expo                 | Unit testing                |

🚀 Running the Project
Install dependencies: **npm install**
Run Android: **npx expo start**
Run Tests: **npm test**

📌 Notes
Device-level authentication supports both biometric verification and device credentials fallback, ensuring compatibility across devices without biometric enrollment.
