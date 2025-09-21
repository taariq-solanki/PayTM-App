export function InputBox({ label, placeholder, type = "text", onChange, value, error, required = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
          error 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-gray-400 focus:bg-white'
        }`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}