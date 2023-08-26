const notFound = async (req, res,next)=> {
    if(!res.locals.response){
        res.status(404).send('Route does not exist')

    }else{
        next()
    }
}
export default notFound