
const validateSchema = (Schema) => {
    return (req, res, next) => {
        let {error, value} = Schema.validate(req.body, {abortEarly: false, stripUnknonwn: true});
        if(error){
            let err = error.details.map(validation_error => {
                return{
                    params: validation_error.context.key,
                    message: validation_error.message
                }
            })
            res.status(400).send({
                msg:"bad request",
                err
            });
        } else {
            next();
        }
    }
}
module.exports = validateSchema;