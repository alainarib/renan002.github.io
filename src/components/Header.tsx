import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { professional } = useAuth();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex items-center gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-primary">
          Juristy
        </Link>
        <nav className="flex flex-1 items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
          <Link
            className={cn("transition-colors hover:text-primary", location.pathname === "/" && "text-primary")}
            to="/"
          >
            Início
          </Link>
          {professional && (
            <Link
              className={cn("transition-colors hover:text-primary", isDashboard && "text-primary")}
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
        </nav>
        {!professional && (
          <Button asChild variant="outline">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
