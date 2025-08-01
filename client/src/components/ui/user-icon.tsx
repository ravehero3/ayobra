

import * as React from "react"
import { cn } from "@/lib/utils"

interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

const UserIcon = React.forwardRef<HTMLDivElement, UserIconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-full transition-colors cursor-pointer",
          "bg-white hover:bg-gray-400 text-black",
          className
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M12 14c-6 0-8 2.5-8 6v2h16v-2c0-3.5-2-6-8-6z" />
        </svg>
      </div>
    )
  }
)

UserIcon.displayName = "UserIcon"

export { UserIcon }

