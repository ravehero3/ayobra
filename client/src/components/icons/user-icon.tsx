
export function UserIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-full flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="8" r="3" fill="black" />
        <path d="M16 14v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z" fill="black" />
      </svg>
    </div>
  );
}
