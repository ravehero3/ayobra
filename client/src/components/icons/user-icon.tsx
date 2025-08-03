
export function UserIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center transition-colors duration-200 hover:opacity-60`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="8" r="4" fill="white" className="transition-colors duration-200 group-hover:fill-gray-400" />
        <path d="M12 14c-6 0-8 2.5-8 6v2h16v-2c0-3.5-2-6-8-6z" fill="white" className="transition-colors duration-200 group-hover:fill-gray-400" />
      </svg>
    </div>
  );
}
