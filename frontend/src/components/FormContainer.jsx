
function FormContainer({ children }) {
  return (
    <div className="rounded-lg form" style={ { backgroundColor: '#202442'}}>
        <div className="p-5">
            { children }
        </div>
    </div>
  )
}

export default FormContainer