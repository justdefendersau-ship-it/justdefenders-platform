"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function NavLink({ href, children }: any) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      style={{
        fontWeight: pathname === href ? "bold" : "normal",
        color: pathname === href ? "#000" : "#666"
      }}
    >
      {children}
    </Link>
  )
}