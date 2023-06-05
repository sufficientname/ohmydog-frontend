export default function Loader({ loading, children }) {
  if (loading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
