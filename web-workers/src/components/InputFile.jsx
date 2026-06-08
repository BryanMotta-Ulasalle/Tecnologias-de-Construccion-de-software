

const InputFile = ({ handleFileUpload, uploadFile, version }) => {
  const versions = {
    cyan:"bg-cyan-400",
    purple: "bg-purple-500"
  } 
  return (
    <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          handleFileUpload(e);
          uploadFile(true);
        }}
        className={`px-4 py-2 ${versions[version] || 'bg-cyan-400'} text-white rounded hover:${versions[version] ? 'bg-purple-600' : 'bg-cyan-600'} transition-colors`}
      />
  )
}

export default InputFile