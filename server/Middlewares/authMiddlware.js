//c'est quoi middleware

//Un middleware est une fonction intermédiaire dans une application web qui a accès à l'objet de la requête (request object), à l'objet de la réponse (response object), et à la fonction next() dans le cycle de requête-réponse HTTP.
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: "Authorization header is missing",
                success: false,
            });
        }
        //Si l'en-tête d'autorisation est présent, le jeton JWT est extrait de l'en-tête en utilisant req.headers.authorization.split(" ")[1]. L'en-tête d'autorisation est généralement au format "Bearer <token>", donc en utilisant split(" "), on divise la chaîne pour obtenir seulement le token.
        const token = req.headers.authorization.split(" ")[1];
        //Vérification de la validité du jeton JWT :
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Invalid token",
                    success: false,
                });
            } else {
                //Extraction de l'ID de l'utilisateur du jeton décodé :
                req.body.userId = decoded.id;
                next();
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
            success: false,
        });
    }
}
