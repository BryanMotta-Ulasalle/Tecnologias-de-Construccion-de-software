

const Table = ({ tableData }) => {
  return (
    <div>
        {tableData.length > 0 && (
        <table
          className="rounded-xl w-200 text-left text-white overflow-hidden"
          
        >
          <thead>
            <tr className="border border-white/20 p-2 bg-black/10">
              {tableData[0].map((header, index) => (
                <th key={index} className="border border-white/20 p-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-white/20 p-2">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-white/20 p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table