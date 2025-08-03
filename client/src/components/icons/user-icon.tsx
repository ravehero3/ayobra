interface UserIconProps {
  className?: string;
}

export function UserIcon({ className = "h-4 w-4" }: UserIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head circle */}
      <circle cx="12" cy="7" r="4" />
      {/* Body/shoulders shape - more rounded like the provided icon */}
      <path d="M12 13c-5 0-9 2.5-9 6.5v1.5c0 .5.5 1 1 1h16c.5 0 1-.5 1-1v-1.5c0-4-4-6.5-9-6.5z" />
    </svg>
  );
}