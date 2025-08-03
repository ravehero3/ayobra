
export function UserIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-full flex items-center justify-center border-2 border-gray-200`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" fill="black" />
        <path d="M12 14c-6 0-8 2.5-8 6v2h16v-2c0-3.5-2-6-8-6z" fill="black" />
      </svg>
    </div>
  );
}
