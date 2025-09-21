export function Heading({ label, size = "lg", className = "" }) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl", 
    lg: "text-3xl",
    xl: "text-4xl"
  };

  return (
    <div className={`text-center ${className}`}>
      <h1 className={`font-bold ${sizes[size]} text-gray-800 mb-2`}>
        {label}
      </h1>
    </div>
  );
}