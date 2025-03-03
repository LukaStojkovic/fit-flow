# Fit Flow

**Fit Flow** is a modern fitness tracking application designed to help users monitor and manage their fitness journey. With a sleek and intuitive design, **Fit Flow** allows users to track their workouts, log their stats, and update their profiles in a seamless manner. The app uses **Next.js**, **NextAuth** for authentication, **Tailwind CSS** for styling, and **MongoDB** for data storage, offering a smooth and responsive experience for all fitness enthusiasts.

---

## Features

- **User Authentication**: Secure login and user management with **NextAuth**.
- **Personalized Dashboard**: View workout stats, progress, and upcoming sessions.
- **Profile Editing**: Easily update user details, including weight, height, and username.
- **Workout Logging**: Log workout details with duration, date, and notes.
- **Responsive Design**: Optimized for all devices with a clean, minimalistic UI using **Tailwind CSS**.
- **Dark Mode Support**: Switch between light and dark themes for a comfortable experience.
- **Intuitive Sidebar**: Clean and modern sidebar for easy navigation with subtle hover effects.

---

## Technologies Used

- **Next.js**: React framework for building server-side rendered web applications.
- **NextAuth**: Authentication library for Next.js with support for multiple providers.
- **Tailwind CSS**: Utility-first CSS framework for fast UI development.
- **MongoDB**: NoSQL database for storing user and workout data.
- **Vercel**: For seamless deployment of the app.

---

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB database (either local or via a cloud provider like MongoDB Atlas)
- A code editor like **VSCode**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/fit-flow.git
   cd fit-flow
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root of the project and add the following environment variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the app.

---

## Usage

- **Sign Up / Log In**: Create a new account or log in with your existing credentials to get started.
- **Edit Profile**: Click on the profile icon to update your personal information (weight, height, username).
- **Log Workouts**: Add new workouts by entering the duration, date, and any relevant notes. You can also view your past workouts and progress.
- **Dark Mode**: Toggle dark mode for a better experience in low-light environments.

---

## Contributing

We welcome contributions to **Fit Flow**! If you'd like to improve the app or fix any issues, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- **Next.js** for providing an excellent React framework.
- **Tailwind CSS** for simplifying the design process with utility-first classes.
- **NextAuth** for secure and flexible authentication solutions.
- **MongoDB** for scalable and easy-to-use NoSQL database.
- **Vercel** for seamless app deployment.

---

## Contact

- GitHub: [@lukastojkovic](https://github.com/lukastojkovic)
- Email: lukastojkovic006.ls@gmail.com
