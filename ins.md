# 🧠 AI Development Instructions (Next.js + Server Actions)

## 📦 Technologies

- Next.js App Router (with Server Actions)
- TypeScript
- PostgreSQL (via Prisma or Drizzle)
- ImageKit (image uploads)
- JWT for Auth

---

## 👤 User Features

1. **Authentication**
   - `signup(userData)`  
     - Creates user with name, email, password, profile picture (ImageKit).
     - Returns JWT.
   - `login(credentials)`  
     - Verifies user and returns JWT.
   - `getUserFromToken(token)`  
     - Decodes token and returns user.

2. **Profile**
   - `getUserProfile(userId)`
   - `updateUserProfile(userId, data)`  
     - Allow updating name, password, or profile picture.

3. **Membership**
   - `getMembership(userId)`
   - `renewMembership(userId, type)`  
     - Mock payment logic and update expiry.

4. **Classes**
   - `getAvailableClasses()`
   - `joinClass(userId, classId)`  
     - Check capacity and add user to attendance.

---

## 🛠️ Admin Features

1. **Class Management**
   - `createClass(data)`  
     - Fields: name, instructor, time, capacity.
   - `editClass(classId, data)`
   - `deleteClass(classId)`
   - `getAllClasses()`

2. **Membership Management**
   - `getAllMemberships()`  
     - List users and their membership status.

3. **Attendance**
   - `getClassAttendance(classId)`  
     - Show users joined per class.

4. **Dashboard Stats**
   - `getDashboardData()`  
     - Return:
       - totalUsers
       - totalClasses
       - totalAttendance

---

## 🧩 Database Models (PostgreSQL)

- `User(id, name, email, password, profileImage, role)`
- `Membership(id, userId, status, expiryDate)`
- `Class(id, name, instructor, time, capacity)`
- `Attendance(id, userId, classId)`

---

## 🔐 Notes

- Use **Server Actions** only (`app/` directory).
- Protect actions by decoding JWT on the server.
- Use **ImageKit** SDK for uploads.
- Keep all responses server-safe and return minimal JSON for UI rendering.
