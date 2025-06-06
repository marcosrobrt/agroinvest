import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Cotações Agro', href: '/cotacoes' },
  { name: 'Análises de Mercado', href: '/analises' },
  { name: 'Calculadora de Rentabilidade', href: '/rentabilidade' },
  { name: 'Oportunidades', href: '/oportunidades' },
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fechar menu mobile quando mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 py-2">
              <img src={logo} alt="AGROINVEST Logo" className="h-10 w-10" />
              <span className="text-xl md:text-2xl font-bold text-green-600">AGROINVEST</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-green-600 transition-colors ${
                  location.pathname === item.href ? 'text-green-600 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-white z-50 md:hidden">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 