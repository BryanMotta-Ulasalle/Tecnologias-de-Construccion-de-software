

const InputFile = ({ handleFileUpload, uploadFile }) => {
  return (
    <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          handleFileUpload(e);
          uploadFile(true);
        }}
        className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-600 transition-colors"
      />
  )
}

export default InputFile