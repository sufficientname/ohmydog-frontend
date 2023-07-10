function TR({ headers, data }) {
  return (
    <tr>
      {headers.map((header, i) => {
        let value = data[header.key || header.label];
        if (header.wrapper) {
          value = header.wrapper(value, data);
        }
        return <td key={i}>{value}</td>;
      })}
    </tr>
  );
}

function TBody({ headers, data, loading }) {
  return loading ? (
    <tbody></tbody>
  ) : (
    <tbody>
      {data.map((item, i) => (
        <TR headers={headers} data={item} key={i} />
      ))}
    </tbody>
  );
}

function THead({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header, i) => (
          <th key={i}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );
}

export default function Table({ headers, data, loading }) {
  return (
    <>
      <table>
        <THead headers={headers} />
        <TBody headers={headers} data={data} loading={loading} />
      </table>
      {loading ? <p>cargando...</p> : null}
    </>
  );
}
