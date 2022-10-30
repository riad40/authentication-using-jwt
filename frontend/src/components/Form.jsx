
function Form() {

    const route = ''
    const title = 'Form Title'

  return (

    <div className="w-2/5 rounded-lg" style={ { backgroundColor: 'rgb(51, 56, 90)'}}>
        <div className="login px-7 py-10">
            <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">{ title }</h1>
            <form action={ route } method="post" >
                
            </form>
        </div>
    </div>

  )
}

export default Form