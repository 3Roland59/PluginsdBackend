const Organization = require('../models/organizationModel')

 const createOrganization = async(name, managerId) =>{
    const org = await Organization.create({
        name,
        managerId
      });
      return org
}

 const getAllOrganizations = async(managerId)=>{ 
    const orgs = await Organization.find({managerId});
    return orgs;
}

 const getOrganization = async(name, managerId)=>{ 
    const org = await Organization.findOne({name, managerId});
    return org;
}

 const removeOrganization = async(name, managerId)=>{
    const org = await Organization.deleteOne({name, managerId});
    return org
}

module.exports = {createOrganization, getAllOrganizations,getOrganization, removeOrganization }