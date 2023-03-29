const usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function(req,res, nex){
        usuario.fundOne({email:req.body.email}, function(err, userInfo){
            if(err){
                next(err);
            } else {
                if(userInfo == null) { return res.status(401).json({status:"error", message: "Invalido email/password", data: null}); }
                if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                
                        const token = jwt.sign({id: usuario_id}, req.app.get('secretKey'), {expiresIn: '7d'});
                        res.status(200).json({message: "usuario encontrado!", data:{usuario: usuario, token: token}});
                
                    } else {
                    res.status(401).json({status: "error", message:"Invalido email/password!", data: null});
                }
            }
        });
    },
    forgotPassword: function(req, res, next){
        usuario.findOne({email: req.body.email}, function(err, usuario){
            if(!usuario) return res.status(401).json({message: "No existe el usuario", data:null});
            usuario.resetPassword(function(err){
                if (err) {return next(err); }
                res.status(200).json({message: "Se envio un email para restalecer el password"});
            });
        });
    },
}