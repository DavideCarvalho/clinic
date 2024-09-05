import { Link } from '@inertiajs/react'
import { ContactIcon } from 'lucide-react'

export function ClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <ContactIcon className="w-6 h-6 text-purple-400" />
          <h1 className="text-xl font-bold text-purple-400">Clinicare</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6 gap-6">{children}</main>
    </div>
  )
}
