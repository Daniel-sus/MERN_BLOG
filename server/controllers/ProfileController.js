import UserModel from "../models/User.js"

export const getUserProfile = async(req,res) => {
    try {
      console.log(req.params.id)
       const user = await UserModel.findOne({_id: req.params.id})
       res.json(user)
    } catch (error) {
        res.status(500).json({
            message: "Failed get User",
          });
    }
}