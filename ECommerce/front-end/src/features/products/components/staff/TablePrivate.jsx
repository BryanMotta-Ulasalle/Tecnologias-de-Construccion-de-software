

const TablePrivate = ({ columns, data }) => {

    const getValue = (row, key) => {
        return key.split(".").reduce((acc, part) => acc?.[part], row)
    }

    return (
        <div className="bg-white  rounded-2xl border border-gray-300 border-collapse">
            <table className="w-full">
                <thead className="">
                    <tr className="border-b border-gray-200 text-left">
                        {columns.map((column) => (
                            <th key={column.key} className="py-3 pl-5 text-gray-400"
                            >{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="">
                            {columns.map((column) => {
                                const value = getValue(row, column.key)
                                return (
                                    <td key={column.key} className="py-4 pl-5">
                                        {column.render ? column.render(value, row) : value}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePrivate
