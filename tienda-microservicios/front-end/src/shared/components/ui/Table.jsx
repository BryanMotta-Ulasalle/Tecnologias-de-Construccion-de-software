import React from 'react'

const Table = ({ header }) => {

    const data = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com'
        }
    ]

  return (
    <table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
        <thead className=''>
            <tr>
                {
                    header.map((item, index) => <th key={index}>{item}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((item, index) => (
                    <tr key={index}>
                        
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default Table
