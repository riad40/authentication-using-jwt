
function FormContainer({ children }) {
  return (
    <div className="w-2/5 rounded-lg" style={ { backgroundColor: '#202442'}}>
        <div className="p-5">
            { children }
        </div>
    </div>
  )
}

export default FormContainer