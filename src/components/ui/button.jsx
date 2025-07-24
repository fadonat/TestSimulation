export function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
    >
      {children}
    </button>
  );
}
