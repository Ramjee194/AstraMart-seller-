 export default function roleMiddleware(allowRoles =[]){
    return (req,res,next)=>{
        //check if user is present
        if(!req.user){
            return res.status(401).json({message:'not authenticated'});
        }
        //check if user role is allowed
        if(!allowRoles.includes(req.user.role)){
            return res.status(403).json({message:'fobidden: insufficient role'});

        }next();
    }
 }