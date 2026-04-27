import React from 'react'

const TitleMain = ({ icon: Icon, h1, p }) => {
    return (
        <div className='flex flex-row items-center gap-4 py-10 px-5 border-b-2 border-tableBorder'>
            {Icon && <Icon className='w-13 h-13 text-icon bg-iconBackground p-1 rounded-lg' />}
            <div>
                <h1 className='text-xl font-bold text-text2'>{h1}</h1>
                <p className='text-text1'>{p}</p>
            </div>
        </div>
    )
}

export default TitleMain