import { Github, Linkedin } from 'lucide-react'

const GITHUB_URL = 'https://github.com/dubuguidev'
const LINKEDIN_URL = 'https://www.linkedin.com/in/gabrielbcostadev'

export default function Footer() {
  return (
    <footer className="border-t border-red-950/40 bg-infernal-black/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
        <p className="text-xs text-stone-500 text-center sm:justify-self-start">
          © 2026 Infernal Forge - Ímpio . Todos os direitos reservados.
        </p>

        <p className="text-xs text-stone-500 text-center sm:justify-self-center">
          Lasciate ogne speranza, voi ch'intrate
        </p>

        <div className="flex items-center justify-center sm:justify-self-end gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rpg-btn-ghost text-xs py-1.5 px-3"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rpg-btn-ghost text-xs py-1.5 px-3"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
