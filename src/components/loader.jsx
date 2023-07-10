export default function Loader({ loading, children }) {
  return loading ? (
    <div>
      <p>Cargando...</p>
    </div>
  ) : (
    <>{children}</>
  );
}
