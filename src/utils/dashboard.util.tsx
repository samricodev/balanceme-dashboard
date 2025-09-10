const formatIconTransaction = (type: 'income' | 'expense' | 'saving' | 'investment') => {
  switch (type) {
    case 'income':
      // Flecha hacia abajo (entrada de dinero)
      return (
        <div className="p-2 rounded-full bg-green-100">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
          </svg>
        </div>
      );

    case 'expense':
      // Flecha hacia arriba (salida de dinero)
      return (
        <div className="p-2 rounded-full bg-red-100">
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V4m0 0l-6 6m6-6l6 6" />
          </svg>
        </div>
      );

    case 'saving':
      // Ícono tipo alcancía (círculo con moneda entrando)
      return (
        <div className="p-2 rounded-full bg-blue-100">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 2" />
          </svg>
        </div>
      );

    case 'investment':
      // Gráfica ascendente (línea con tendencia hacia arriba)
      return (
        <div className="p-2 rounded-full bg-purple-100">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3V3" />
          </svg>
        </div>
      );
  }
};

export {
  formatIconTransaction
}