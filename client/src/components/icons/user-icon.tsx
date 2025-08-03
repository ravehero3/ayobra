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
      <circle cx="12" cy="8" r="4" />
      {/* Body/shoulders shape */}
      <path d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
    </svg>
  );
}