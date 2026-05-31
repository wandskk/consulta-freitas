export function getStockStatus(stock: number) {
  if (stock < 0) {
    return {
      label: 'Estoque negativo',
      className: 'bg-red-100 text-red-700 border-red-200',
    }
  }

  if (stock === 0) {
    return {
      label: 'Sem estoque',
      className: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    }
  }

  if (stock <= 5) {
    return {
      label: 'Estoque baixo',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    }
  }

  return {
    label: 'Disponível',
    className: 'bg-green-100 text-green-700 border-green-200',
  }
}
