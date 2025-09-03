/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { TransactionTypes } from '../utils/enums';
import { useAccounts } from '../hooks/useAccounts';
import { Navbar } from "../components/navbar/Navbar";
import { useCategories } from '../hooks/useCategories';
import { useTransactions } from '../hooks/useTransactions';
import { getTransactionTypeDisplay } from '../utils/getTransactionTypeDisplay';

const Transactions = () => {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    refetch
  } = useTransactions();
  const { accounts } = useAccounts();
  const { categories } = useCategories();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => String(cat.id) === String(categoryId));
    return category ? category.name : categoryId;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => String(cat.id) === String(categoryId));
    return category ? category.icon : null;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => String(cat.id) === String(categoryId));
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find((acc) => String(acc.id) === String(accountId));
    return account ? account.name : accountId;
  };

  const [formData, setFormData] = useState({
    accountId: '',
    categoryId: '',
    note: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTransaction = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await createTransaction({
      userId: localStorage.getItem("userId") || '',
      accountId: formData.accountId,
      categoryId: formData.categoryId,
      note: formData.note,
      amount: parseFloat(formData.amount),
      type: formData.type as 'income' | 'expense' | 'transfer',
      date: formData.date
    });

    if (result.success) {
      setFormData({
        accountId: '',
        categoryId: '',
        note: '',
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
      refetch();
      setShowCreateForm(false);
    } else {
      console.error('Error creating transaction:', result.error);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'MXN') => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const getAmountDisplay = (transaction: any) => {
    let color = '';
    let display = '';
    if (transaction.type === 'income') {
      color = 'text-green-600';
      display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
    } else if (transaction.type === 'expense') {
      color = 'text-red-600';
      display = `-${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
    } else if (transaction.type === 'saving') {
      color = 'text-blue-600';
      display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
    } else if (transaction.type === 'investment') {
      color = 'text-purple-600';
      display = `+${formatCurrency(Math.abs(transaction.amount), transaction.currency)}`;
    }
    return { color, display };
  };

  const getIconSVG = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'shopping-cart': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13l2.5 5M9 19.5h.01M20 19.5h.01" />
        </svg>
      ),
      'zap': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'dollar-sign': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      'truck': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      'music': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      'trending-up': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      'tag': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      'home': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      'heart': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      'book': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    };
    return iconMap[iconName] || iconMap['tag'];
  };

  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const filteredTransactions = safeTransactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.categoryId === filterCategory;
    const matchesSearch = transaction.note.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const totalIncome = safeTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = safeTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalGrowth = safeTransactions.filter(t => t.type === 'saving' || t.type === 'investment').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = (totalIncome + totalGrowth) - totalExpense;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 font-medium">Cargando tus movimientos...</p>
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
                    <Repeat size={32} color='indigo' />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Mis Movimientos</h1>
                    <p className="text-indigo-100">Historial completo de movimientos</p>
                  </div>
                </div>
                <div className="text-right text-white">
                  <p className="text-sm text-indigo-100 mb-1">Balance Neto</p>
                  <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-white' : 'text-red-200'}`}>
                    {formatCurrency(netBalance)}
                  </p>
                  <p className="text-sm text-indigo-100">{transactions.length} movimientos</p>
                </div>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Ingresos</p>
                      <p className="text-xl font-bold text-green-800">{formatCurrency(totalIncome)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-red-700 font-medium">Gastos</p>
                      <p className="text-xl font-bold text-red-800">{formatCurrency(totalExpense)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Crecimiento</p>
                      <p className="text-xl font-bold text-blue-800">{formatCurrency(totalGrowth)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Búsqueda */}
                <div className="flex-1">
                  <input
                    name="search"
                    type="text"
                    placeholder="Buscar movimientos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Filtros */}
                <div className="flex gap-4">
                  <select
                    name="filterType"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">Todos los tipos</option>
                    {Object.entries(TransactionTypes).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>

                  <select
                    name="filterCategory"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nuevo Movimiento</span>
              </button>
            </div>
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
                      <span>Nuevo Movimiento</span>
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

                <form onSubmit={handleCreateTransaction} className="p-6 space-y-4">
                  <div>
                    <label htmlFor='note' className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción
                    </label>
                    <input
                      type="text"
                      name="note"
                      id="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Ej: Compra en supermercado"
                    />
                  </div>

                  <div>
                    <label htmlFor='amount' className="block text-sm font-semibold text-gray-700 mb-2">
                      Monto
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label htmlFor='type' className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo
                    </label>
                    <select
                      name="type"
                      id="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" disabled>Selecciona un tipo</option>
                      {Object.entries(TransactionTypes).map(([key, value]) => (
                        <option key={key} value={value}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor='categoryId' className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      name="categoryId"
                      id="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" disabled>
                        Selecciona una categoría
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={String(category.id)}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor='date' className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor='accountId' className="block text-sm font-semibold text-gray-700 mb-2">
                      Cuenta
                    </label>
                    <select
                      name="accountId"
                      id="accountId"
                      value={formData.accountId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" disabled>
                        Selecciona una cuenta
                      </option>
                      {accounts.map((account) => (
                        <option key={account.id} value={String(account.id)}>
                          {account.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Crear Movimiento
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

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Error al cargar los movimientos</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {/* Lista de movimientos */}
          {!error && (
            filteredTransactions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="text-center py-16">
                  <Repeat size={72} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No hay movimientos</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || filterType !== 'all' || filterCategory !== 'all'
                      ? 'No se encontraron movimientos con los filtros aplicados'
                      : 'Comienza registrando tu primer movimiento'
                    }
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    Crear Primer Movimiento
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {filteredTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div style={{ backgroundColor: getCategoryColor(transaction.categoryId) }} className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                            {getIconSVG(getCategoryIcon(transaction.categoryId) || 'tag')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {transaction.note}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500 capitalize">{getCategoryName(transaction.categoryId)}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{getAccountName(transaction.accountId)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xl font-bold ${getAmountDisplay(transaction).color}`}
                          >
                            {getAmountDisplay(transaction).display}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getTransactionTypeDisplay(transaction.type).className}`}
                          >
                            {getTransactionTypeDisplay(transaction.type).label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paginación o información adicional */}
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Mostrando {filteredTransactions.length} de {transactions.length} movimientos
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;