import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-base-100/80 backdrop-blur-lg border-b border-base-300 z-50">
      <div className="mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
              <img src="logo.png" alt="" className="rounded-lg h-full w-full" />
            </div>
            <h1 className="text-lg font-bold">Chat Cont</h1>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <Link to="/setting" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer btn btn-sm"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
