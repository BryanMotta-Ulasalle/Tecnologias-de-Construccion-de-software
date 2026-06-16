import { useState, useEffect } from 'react'
import axios from 'axios'
import Asia from "./example.json"
import Select from "./components/Select"
import Card from './components/Card'

const App = () => {

  const [region, setRegion] = useState('')
  const [datos, setDatos] = useState([])
  const [pais, setPais] = useState('')
  const [datosPais, setDatosPais] = useState([])
  const [hayDatos, setHayDatos] = useState(false)
  const [loading, setLoading] = useState('false')
  const [button, setbutton] = useState('false')

  async function getRegions() {
    try {
      const response = await axios.get(
        `https://api.restcountries.com/countries/v5?region=${region}&response_fields=names.common&api-key=rc_live_c5bba02ac615494b93e56b91eb8e09f1`
      );

      setDatos(response.data.data.objects)
      setLoading('')
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  }

  useEffect(() => {
    if (region) {
      getRegions()
    }
  }, [region])

  async function getCountry() {
    try {
      const response = await axios.get('https://api.restcountries.com/countries/v5?names.common=' + pais + '&response_fields=names.common,names.native,languages&api-key=rc_live_c5bba02ac615494b93e56b91eb8e09f1')

      setDatosPais(response.data.data.objects)
      setHayDatos(true)
    } catch (error) {
      console.log(error)
    }
  }

  const regions = [
    {
      name: "Asia",
      value: "Asia"
    },
    {
      name: "Europa",
      value: "Europe"
    },
    {
      name: "Americas",
      value: "Americas"
    },
  ]

  return (
    <div className="bg-[#ECF3FB] h-dvh flex flex-col items-center gap-20">
      <div className="flex flex-col gap-5 pt-20">
        <h1 className="text-5xl font-semibold">Explora el Mundo</h1>
        <p className="text-[#545F73] font-medium"> Descubre datos geopoliticos y culturales con precision</p>
      </div>

      <div className="border border-white shadow-lg p-10 rounded-2xl bg-white flex flex-row gap-4">
        <Select value={region} onChange={(e) => { setRegion(e.target.value) }}>
          <option value="">Selecciona una Region</option>
          {regions.map((region) => (
            <option value={region.value}>{region.name}</option>
          ))}
        </Select>

        <Select value={pais} disabled={loading} onChange={(e) => {setPais(e.target.value); setbutton('')}}>
          <option value="">Selecciona un Pais</option>
          {datos.map((dato) => (
            <option value={dato.names.common}>{dato.names.common}</option>
          ))}
        </Select>

        <button disabled={button} onClick={() => getCountry()}
          className="bg-[#005DA8] text-white px-13 rounded-lg font-medium cursor-pointer hover:bg-[#36bbcc] disabled:bg-gray-500 disabled:cursor-not-allowed" >Buscar</button>
      </div>

      {hayDatos && <div>
        <div className="flex flex-row gap-2 justify-center items-center mb-10">
        <h2 className="text-3xl font-medium">{pais}</h2>
        <span className="bg-[#CBDCF7] border border-blue-400 rounded-2xl px-3 text-sm h-6 text-blue-800 font-medium" >{region}</span>
      </div>

      <div className="flex flex-row gap-5 w-200">
          
          <Card title="Nombres Nativos" 
          etc={<div className="flex flex-col gap-2">
              {datosPais.map((data)=>(
                Object.values(data.names.native).map((name)=>(
                  <span className="border-b border-gray-300 p-1 text-gray-500">{name.common}</span>
                ))
              ))}
            </div>}/>

            <Card title="Idiomas" etc={
              <div className="grid grid-cols-2 gap-6">
              {datosPais.map((data)=>(
                Object.values(data.languages).map((name)=>(
                  <div className="bg-[#E6E8EA] p-3 border border-[#C2C6D6] rounded-xl">{name.name}</div>
                ))
              ))}
            </div>
            }/>
      </div>
      </div>
      }



    </div>
  )
}

export default App