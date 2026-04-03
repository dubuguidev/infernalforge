'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Flame, Lock, ScrollText, UserRound } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import { useAuth } from '@/hooks/useAuth'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const { isReady, isAuthenticated, login, register } = useAuth()

  const [tab, setTab] = useState<Tab>('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const [identifier, setIdentifier] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [lgpdAccepted, setLgpdAccepted] = useState(false)

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response?: unknown }).response === 'object' &&
      (error as { response?: { data?: unknown } }).response?.data &&
      typeof (error as { response?: { data?: unknown } }).response?.data === 'object'
    ) {
      const data = (error as { response?: { data?: { message?: unknown } } }).response?.data
      if (typeof data?.message === 'string') return data.message
      if (Array.isArray(data?.message) && typeof data.message[0] === 'string') return data.message[0]
    }
    return fallback
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('tab') === 'register') {
      setTab('register')
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    if (isAuthenticated) router.replace('/')
  }, [isReady, isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login({ identifier, password: loginPassword })
      toast.success('Bem-vindo de volta à Forja Infernal.')
      router.replace('/')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Login inválido. Verifique usuário/e-mail e senha.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!lgpdAccepted) {
      toast.error('Você precisa aceitar os termos da LGPD para criar a conta.')
      return
    }

    setIsSubmitting(true)
    try {
      await register({
        username,
        email,
        password: registerPassword,
        lgpdAccepted,
      })
      toast.success('Conta criada com sucesso.')
      router.replace('/')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível criar a conta. Verifique os dados informados.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isReady) {
    return (
      <div className="flex justify-center py-36">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <div className="rpg-card p-6 sm:p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flame className="w-5 h-5 text-red-600 flame" />
            <h1 className="font-cinzel font-black text-xl tracking-[0.14em] text-stone-100">
              Portal da Forja
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`rpg-btn-secondary text-xs py-2 ${tab === 'login' ? 'border-red-700 text-red-300' : ''}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`rpg-btn-secondary text-xs py-2 ${tab === 'register' ? 'border-red-700 text-red-300' : ''}`}
            >
              Criar Conta
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="rpg-label">Usuário ou e-mail</label>
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="rpg-input"
                  placeholder="seu.usuario ou email@dominio.com"
                  required
                />
              </div>
              <div>
                <label className="rpg-label">Senha</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="rpg-input pr-10"
                    placeholder="Digite sua senha"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 transition-colors"
                    aria-label={showLoginPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button className="rpg-btn-primary w-full py-3" disabled={isSubmitting}>
                <Lock className="w-4 h-4" />
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="rpg-label">Nome de usuário</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rpg-input"
                  placeholder="Ex: impio_01"
                  required
                />
              </div>

              <div>
                <label className="rpg-label">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rpg-input"
                  placeholder="email@dominio.com"
                  required
                />
              </div>

              <div>
                <label className="rpg-label">Senha</label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="rpg-input pr-10"
                    placeholder="No mínimo 6 caracteres"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 transition-colors"
                    aria-label={showRegisterPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="rpg-btn-ghost text-xs py-1.5 px-3"
              >
                <ScrollText className="w-3.5 h-3.5" />
                Ler Termos de LGPD
              </button>

              <label className="flex items-start gap-2 text-sm text-stone-400">
                <input
                  type="checkbox"
                  checked={lgpdAccepted}
                  onChange={(e) => setLgpdAccepted(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Li e aceito os Termos de Serviço e Política de LGPD.
                </span>
              </label>

              <button className="rpg-btn-primary w-full py-3" disabled={isSubmitting || !lgpdAccepted}>
                <UserRound className="w-4 h-4" />
                {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>
          )}

          <div className="rpg-divider" />

          <p className="text-center text-sm text-stone-500">
            Acesso seguro para gerenciar seus personagens.
          </p>

          <div className="mt-4 text-center">
            <Link href="/" className="rpg-btn-ghost text-xs py-1.5 px-3">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Termos de Serviço e Política de LGPD"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4 text-stone-300 leading-relaxed">
          <p className="text-xs text-stone-500">Última atualização: 03 de Abril de 2026</p>

          <p>
            Bem-vindo a Infernal Forge - Ímpio! Ao criar uma conta, você concorda com a coleta e
            processamento dos seus dados pessoais, como nome de usuário e e-mail, conforme a Lei
            Geral de Proteção de Dados (LGPD).
          </p>

          <p>
            <strong>1. Dados Coletados:</strong> Coletamos apenas os dados essenciais para o
            funcionamento da plataforma, como informações de login e os personagens que você adiciona à
            sua biblioteca.
          </p>

          <p>
            <strong>2. Uso dos Dados:</strong> Seus dados são usados exclusivamente para
            personalizar sua experiência na plataforma e não são compartilhados com terceiros.
          </p>

          <div className="pt-3 flex justify-end">
            <button type="button" onClick={() => setShowTermsModal(false)} className="rpg-btn-primary text-xs py-2 px-4">
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
