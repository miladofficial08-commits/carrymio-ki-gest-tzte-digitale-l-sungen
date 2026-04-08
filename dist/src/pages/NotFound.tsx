import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">Seite nicht gefunden</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Diese Seite existiert nicht oder wurde verschoben. Kehren Sie zur Startseite zurück
        und entdecken Sie, wie Tawano Ihre Geschäftsprozesse automatisiert.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        ← Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;
