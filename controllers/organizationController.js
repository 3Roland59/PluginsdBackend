const { createOrganization, getAllOrganizations, getOrganization, removeOrganization } =require("../repository/organizationRepo")


 const registerOrganization =async(req, res)=>{
    const {name} = req.body
    const {_id} = req.user
    try {
        if(!name){
            return res.status(400).json({error: "Fields are required!"})
        }
        const exists = await getOrganization(name,_id)
        if (exists) {
            return res.status(400).json({error: "Organization with such name already exists!"})
          }
        const org = await createOrganization(name,_id)
        if (!org) {
            return res.status(500).json({error: "Creation failed!"})
          }

        res.status(201).json({ message: "Creation successful", organization: org});

    } catch (error) {
        res.status(500).json({error: "An error occurred!"})
    }
}

 const fetchOrganizations = async(req, res)=>{
    const {_id} = req.user
    try {
        const org = await getAllOrganizations(_id)
        res.status(200).json({organization: org});

    } catch (error) {
        res.status(500).json({error: "An error occurred!"})
    }
}

 const fetchOrganization = async(req, res)=>{
    const {_id} = req.user
    const {name} = req.params
    console.log(req.params)
    try {
        if(!name){
            return res.status(400).json({error: "Field is required!"})
        }
        const org = await getOrganization(name, _id)
        res.status(200).json({organization: org});

    } catch (error) {
        res.status(500).json({error: "An error occurred!"})
    }
}

 const deleteOrganization = async(req, res)=>{
    const {_id} = req.user
    const {name} = req.params
    try {
        if(!name){
            return res.status(400).json({error: "Field is required!"})
        }
        const org = await removeOrganization(name, _id)
        res.status(200).json({message:"Successfully removed", ...org});

    } catch (error) {
        res.status(500).json({error: "An error occurred!"})
    }
}

module.exports = {registerOrganization, deleteOrganization,fetchOrganization,fetchOrganizations}