import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white/90 hover:text-white transition"
        >
          CareerForge
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-sm text-white/70 hover:text-white transition"
          >
            About Us
          </Link>

          <Link
            href="/blog"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Blog
          </Link>
        </nav>

      </div>
    </header>
  )
}