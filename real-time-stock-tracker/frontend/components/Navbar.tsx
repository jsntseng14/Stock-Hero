import LoginAlert from "./LoginAlert";

export default function Navbar() {
    return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Real-Time Stock Tracker</h1>
        <div className="flex gap-4">
            <LoginAlert
            lastLoginTime="2024-03-01T10:00:00Z"
            currentLoginTime="2024-03-20T08:00:00Z"
            lastLoginIP="192.168.1.1"
            currentLoginIP="10.0.0.2"
            />
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Login</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Settings</button>
        </div>
      </nav>
    );
  }
  