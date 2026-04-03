'use client'

import Link from 'next/link'
import { Swords, Flame } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { isReady, isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-red-950/40 bg-infernal-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative">
              <Swords
                className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-colors"
                style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.5))' }}
              />
            </div>
            <span
              className="font-cinzel font-black text-base tracking-[0.2em] text-red-500 group-hover:text-red-400 transition-colors"
              style={{ textShadow: '0 0 16px rgba(220,38,38,0.4)' }}
            >
              FORJA INFERNAL — ÍMPIO
            </span>
            <Flame
              className="w-4 h-4 text-orange-500/60 flame hidden sm:block"
              style={{ filter: 'drop-shadow(0 0 4px rgba(249,115,22,0.5))' }}
            />
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/" className="rpg-btn-ghost text-xs py-1.5 px-3">
              Grimório
            </Link>

            {isReady && isAuthenticated && (
              <Link href="/characters/new" className="rpg-btn-primary text-xs py-1.5 px-4">
                + Criar
              </Link>
            )}

            {isReady && !isAuthenticated && (
              <>
                <Link href="/login" className="rpg-btn-secondary text-xs py-1.5 px-3">
                  Entrar
                </Link>
                <Link href="/register" className="rpg-btn-primary text-xs py-1.5 px-3">
                  Criar Conta
                </Link>
              </>
            )}

            {isReady && isAuthenticated && (
              <>
                <span className="hidden md:inline text-[11px] text-stone-500 font-cinzel tracking-[0.14em] uppercase">
                  {user?.username}
                </span>
                <button type="button" onClick={logout} className="rpg-btn-secondary text-xs py-1.5 px-3">
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
