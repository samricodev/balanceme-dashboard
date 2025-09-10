/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Wallet, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from "../hooks/useAccounts";
import { Navbar } from "../components/navbar/Navbar";
import { getAccountIcon } from '../utils/account.util';
import {
  getAccountTypeColor,
  getTextAccountType,
  formatCurrency
} from '../utils/account.utils';

const Accounts = () => {
  const {
    totalBalance,
    accounts,
    loading,
    error,
    createAccount,
    deleteAccount
  } = useAccounts();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'savings',
    currency: 'MXN',
    balance: 0
  });
  const userId = localStorage.getItem('userId') || '';

  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createAccount({
      userId: userId || '',
      name: formData.name,
      type: formData.type,
      currency: formData.currency,
      balance: Number(formData.balance) || 0
    });

    if (result.success) {
      // Éxito - cerrar formulario, etc.
      setFormData({
        name: '',
        type: 'ahorro',
        currency: 'MXN',
        balance: 0
      });
      setShowCreateForm(false);
    } else {
      // Error ya está en el estado del hook
      console.error('Error:', result.error);
    }
  };

  const handleEditAccount = (accountId: string) => {
    alert('Editar cuenta: ' + accountId);
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta cuenta? Esta acción no se puede deshacer.')) {
      const result = await deleteAccount(accountId);
      if (result.success) {
        // Éxito - actualizar estado, etc.
      } else {
        // Error ya está en el estado del hook
        console.error('Error:', result.error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 font-medium">Cargando tus cuentas...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Error al cargar</h3>
              </div>
              <p className="text-gray-600 mb-6">No se pudo cargar la información de las cuentas</p>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                Refrescar Sesión
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Wallet size={32} color='indigo' />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Mis Cuentas</h1>
                    <p className="text-indigo-100">Resumen de todas tus cuentas bancarias</p>
                  </div>
                </div>
                <div className="text-right text-white">
                  <p className="text-sm text-indigo-100 mb-1">Balance Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalBalance, 'MXN')}</p>
                  <p className="text-sm text-indigo-100">{accounts?.length || 0} {(accounts?.length || 0) === 1 ? 'cuenta' : 'cuentas'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón crear cuenta */}
          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Nueva Cuenta</span>
            </button>
          </div>

          {/* Modal de creación */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Nueva Cuenta</span>
                    </h2>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleCreateAccount} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de la cuenta
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Ej: Cuenta de Ahorro Principal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de cuenta
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" defaultChecked disabled>Selecciona un tipo</option>
                      <option value="savings">Cuenta de Ahorro</option>
                      <option value="checking">Cuenta Corriente</option>
                      <option value="credit">Tarjeta de Crédito</option>
                      <option value="investment">Cuenta de Inversión</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Moneda
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="MXN">Peso Mexicano (MXN)</option>
                      <option value="USD">Dólar Americano (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Saldo inicial (opcional)
                    </label>
                    <input
                      type="number"
                      name="balance"
                      value={formData.balance}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Crear Cuenta
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Cuentas */}
          {(!accounts || accounts.length === 0) && !error ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="text-center py-16">
                <Wallet size={72} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No hay cuentas disponibles</h3>
                <p className="text-gray-500 mb-6">Comienza creando tu primera cuenta bancaria</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Crear Primera Cuenta
                </button>
              </div>
            </div>
          ) : accounts && accounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map(account => (
                <div
                  key={account.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Header de la tarjeta */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${getAccountTypeColor(account.type)} border`}>
                        {getAccountIcon(account.type)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditAccount(account.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{account.name}</h2>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Balance */}
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-500 mb-1">Saldo Disponible</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {formatCurrency(account.balance, account.currency)}
                        </p>
                      </div>

                      {/* Detalles */}
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Moneda</span>
                          </span>
                          <span className="font-semibold text-gray-900">{account.currency || 'MXN'}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>Tipo</span>
                          </span>
                          <span className="font-semibold text-gray-900">{getTextAccountType(account.type) || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="pt-4 space-y-2">
                        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                          Ver Movimientos
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200">
                          Transferir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/* Footer informativo */}
          {accounts.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Mostrando {accounts.length} de {accounts.length} cuentas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accounts;
