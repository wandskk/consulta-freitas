type QuantityControlProps = {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  onChange: (quantity: number) => void
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffd2c2] bg-white text-lg font-black text-[#151515] transition hover:border-[#e43d16] hover:bg-[#fff0e8]"
        aria-label="Diminuir quantidade"
      >
        -
      </button>

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 w-20 rounded-xl border border-[#ffd2c2] bg-white text-center text-sm font-black text-[#151515] outline-none focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15"
        aria-label="Quantidade"
      />

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffd2c2] bg-white text-lg font-black text-[#151515] transition hover:border-[#e43d16] hover:bg-[#fff0e8]"
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  )
}
