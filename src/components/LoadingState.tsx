import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  message?: string;
  className?: string;
  compact?: boolean;
};

const LoadingState = ({ message = "Carregando dados...", className, compact = false }: LoadingStateProps) => (
  <div
    role="status"
    className={cn(
      "flex flex-col items-center justify-center gap-3 text-center text-muted-foreground",
      compact ? "py-4" : "py-10",
      className,
    )}
  >
    <Loader2 aria-hidden className="h-6 w-6 animate-spin text-primary" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default LoadingState;
