/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useToast } from '../hooks';
import { Tags, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryTypes } from '../utils/enums';
import { Category } from '../types/category.type';
import { getIconSVG } from '../utils/category.util';
import { Navbar } from "../components/navbar/Navbar";
import { useCategories } from '../hooks/useCategories';
import { formatCurrency, getCategoryTypeDisplay } from '../utils/category.utils';

const Categories = () => {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch
  } = useCategories();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    color: '#3B82F6',
    icon: 'tag',
    description: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createCategory({
      userId: localStorage.getItem('userId') || '',
      name: formData.name,
      type: formData.type,
      color: formData.color,
      icon: formData.icon,
      description: formData.description,
      transactionCount: 0,
      totalAmount: 0
    });

    if (result.success) {
      setFormData({
        name: '',
        type: 'expense',
        color: '#3B82F6',
        icon: 'tag',
        description: '',
      });
      refetch();
      setShowCreateForm(false);
    } else {
      addToast({
        title: 'Error',
        type: 'error',
        message: result.error
      });
      console.error('Error:', result.error);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;
    const result = await updateCategory(String(editingCategory.id), {
      userId: localStorage.getItem('userId') || '',
      id: editingCategory.id,
      name: formData.name,
      type: formData.type,
      color: formData.color,
      icon: formData.icon,
      description: formData.description,
    });
    if (result.success) {
      refetch();
      setShowCreateForm(false);
      setEditingCategory(null);
      setFormData({
        name: '',
        type: 'expense',
        color: '#3B82F6',
        icon: 'tag',
        description: '',
      });
    } else {
      addToast({
        title: 'Error',
        type: 'error',
        message: result.error
      });
      console.error('Error:', result.error);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      deleteCategory(String(categoryId)).then(result => {
        if (result.success) {
          console.log('Eliminar categoría:', categoryId);
          refetch();
        } else {
          console.error('Error al eliminar categoría:', result.error);
        }
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'expense', color: '#3B82F6', icon: 'tag', description: '' });
    setShowCreateForm(false);
    setEditingCategory(null);
  };

  // Colores predefinidos
  const predefinedColors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  // Iconos disponibles
  const availableIcons = [
    'shopping-cart', 'zap', 'dollar-sign', 'truck', 'music',
    'trending-up', 'tag', 'home', 'heart', 'book'
  ];

  // Filtrar categorías
  const filteredCategories = categories.filter(category => {
    const matchesType = filterType === 'all' || category.type === filterType;
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calcular estadísticas
  const totalCategories = categories.length;
  const incomeCategories = categories.filter(cat => cat.type === 'income').length;
  const expenseCategories = categories.filter(cat => cat.type === 'expense').length;
  const growthCategories = categories.filter(cat => cat.type === 'saving' || cat.type === 'investment').length;
  const totalTransactions = categories.reduce((sum, cat) => sum + cat.transactionCount, 0);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 font-medium">Cargando tus categorías...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error === 'Error 401: Unauthorized' || error === 'Invalid token') {
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
              <p className="text-gray-600 mb-6">No se pudo cargar la información de las categorías</p>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userId');
                  navigate("/")
                }}
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
                    <Tags size={32} color='indigo' />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Mis Categorías</h1>
                    <p className="text-indigo-100">Organiza tus movimientos por categorías</p>
                  </div>
                </div>
                <div className="text-right text-white">
                  <p className="text-sm text-indigo-100 mb-1">Total de Categorías</p>
                  <p className="text-3xl font-bold">{totalCategories}</p>
                  <p className="text-sm text-indigo-100">{isNaN(totalTransactions) ? 0 : totalTransactions} movimientos</p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
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
                      <p className="text-sm text-green-700 font-medium">Categorías de Ingresos</p>
                      <p className="text-xl font-bold text-green-800">{incomeCategories}</p>
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
                      <p className="text-sm text-red-700 font-medium">Categorías de Gastos</p>
                      <p className="text-xl font-bold text-red-800">{expenseCategories}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Categorías de Crecimiento</p>
                      <p className="text-xl font-bold text-blue-800">{growthCategories}</p>
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
                    name="searchCategory"
                    type="text"
                    placeholder="Buscar categorías..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Filtro de tipo */}
                <div>
                  <select
                    name="filterType"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">Todas las categorías</option>
                    {Object.entries(CategoryTypes).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key}
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
                <span>Nueva Categoría</span>
              </button>
            </div>
          </div>

          {/* Modal de creación/edición */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingCategory ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                      </svg>
                      <span>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</span>
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de la categoría
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Ej: Alimentación"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      {Object.entries(CategoryTypes).map(([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {predefinedColors.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData({ ...formData, color })}
                          className={`w-12 h-12 rounded-xl border-2 ${formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-200'} transition-all duration-200`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full h-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icono
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {availableIcons.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`p-3 rounded-xl border transition-all duration-200 ${formData.icon === icon
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                            }`}
                        >
                          {getIconSVG(icon)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción (opcional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Describe el propósito de esta categoría..."
                    />
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      {editingCategory ? 'Actualizar Categoría' : 'Crear Categoría'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Lista de categorías */}
          {filteredCategories.length === 0 && !error ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="text-center py-16">
                <Tags size={72} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No hay categorías</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filterType !== 'all'
                    ? 'No se encontraron categorías con los filtros aplicados'
                    : 'Comienza creando tu primera categoría para organizar tus movimientos'
                  }
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Crear Primera Categoría
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Header de la tarjeta */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: String(category.color) }}
                      >
                        {getIconSVG(category.icon)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setFormData({
                              name: category.name,
                              type: category.type,
                              color: category.color,
                              icon: category.icon,
                              description: category.description || ''
                            });
                            setShowCreateForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 hover:cursor-pointer rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:cursor-pointer rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryTypeDisplay(category.type).className}`}
                      >
                        {getCategoryTypeDisplay(category.type).label}
                      </span>
                    </div>

                    {category.description && (
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    )}
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Estadísticas */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {category.transactionCount}
                          </p>
                          <p className="text-sm text-gray-500">Movimientos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(Math.abs(category.totalAmount))}
                          </p>
                          <p className="text-sm text-gray-500">Total</p>
                        </div>
                      </div>

                      {/* Barra de progreso (opcional) */}
                      <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            backgroundColor: category.color,
                            width: `${totalTransactions > 0 ? (category.transactionCount / totalTransactions) * 100 : 0}%`
                          }}
                        />
                      </div>

                      {/* Botones de acción */}
                      <div className="pt-2 space-y-2">
                        <button onClick={() => navigate('/movimientos')} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg hover:cursor-pointer text-sm">
                          Ver Movimientos
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setFormData({
                              name: category.name,
                              type: category.type,
                              color: category.color,
                              icon: category.icon,
                              description: category.description || ''
                            });
                            setShowCreateForm(true);
                          }}
                          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 hover:cursor-pointer transition-all duration-200 text-sm"
                        >
                          Editar Categoría
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer informativo */}
          {filteredCategories.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Mostrando {filteredCategories.length} de {categories.length} categorías
                </p>
                {(searchTerm || filterType !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                    }}
                    className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;