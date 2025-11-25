import contactModel from "../models/contact.model.js";
import welcomeMsgModel from "../models/welcome.model.js";
import ContactModel from "../models/contact.model.js";
import qualificationModel from "../models/qualification.model.js";
import ProjectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
import { updateTokenStatus } from "../controllers/tokenController.js"; // make sure this path is right



//Welcome Msg
export const getWelcomeMsg = async (req, res) => {
    try {
        const msg = await welcomeMsgModel.find();
        console.log(msg);
        res.status(200).json(msg); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// About Page Data
export const getAboutDataById = async (req, res) => {
    try {
        const aboutData = await aboutPageModel.findById(req.params.id);   
        if(!aboutData)
        {
            return res.status(404).json({message: "About Page not found"});
        }
        res.status(200).json(aboutData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAboutPageData = async (req, res) => {
    try {
        const newAboutData = new aboutPageModel(req.body);
        const savedAboutData = await newAboutData.save();
        res.status(200).json(savedAboutData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// CRUD CONTACTS
export const getAllContacts = async (req, res) => {
    try {
        const msg = await ContactModel.find();
        console.log(msg);
        res.status(200).json(msg); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//READ a single contact by ID
export const getContactById = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);   
        if(!contact)
        {
            return res.status(404).json({message: "Contact not found"});
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createContact = async (req, res) => {
    try {
        const newContact = new ContactModel(req.body);
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//UPDATE contact by ID
export const updateContactById = async (req, res) => {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });       



        if(!updatedContact)
        {
            return res.status(404).json({message: "Contact not found"});
        }
        res.status(200).json(updatedContact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE contact by ID
export const deleteContactById = async (req, res) => {
    try {
        const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);       
        if(!deletedContact)
        {
            return res.status(404).json({message: "Contact not found"});
        }
        res.status(200).json({message: "Contact deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Delete all contacts
export const deleteAllContacts = async (req, res) => {
    try {
        const result = await ContactModel.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} contacts deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// CRUD QUALIFICATIONS
// READ all qualifications
export const getAllQualifications = async (req, res) => {
    try {
        const msg = await qualificationModel.find();
        console.log(msg);
        res.status(200).json(msg); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ a single qualification by ID
export const getQualificationById = async (req, res) => {
    try {
        const qualification = await qualificationModel.findById(req.params.id);   
        if(!qualification)
        {
            return res.status(404).json({message: "Qualification not found"});
        }
        res.status(200).json(qualification);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE a new qualification
export const createQualification = async (req, res) => {
    try {
        const newQualification = new qualificationModel(req.body);
        const savedQualification = await newQualification.save();
        res.status(200).json(savedQualification);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE an existing qualification by ID
export const updateQualificationById = async (req, res) => {
    try {
        const qualification = await qualificationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });   
        if(!qualification)
        {
            return res.status(404).json({message: "Qualification not found"});
        }
        res.status(200).json(qualification);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE a qualification by ID
export const deleteQualificationById = async (req, res) => {
    try {
        const deletedQualification = await qualificationModel.findByIdAndDelete(req.params.id);       
        if(!deletedQualification)
        {
            return res.status(404).json({message: "Qualification not found"});
        }
        res.status(200).json({message: "Qualification deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete all qualifications
export const deleteAllQualifications = async (req, res) => {
    try {
        const result = await qualificationModel.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} qualifications deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//CRUD PROJECTS

//READ all projects 
export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//READ a single project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);   
        if(!project)
        {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//CREATE a new project

export const createProject = async (req, res) => {
    try {
        const newProject = new ProjectModel(req.body);
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//UPDATE an existing project by ID
export const updateProjectById = async (req, res) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });       



        if(!updatedProject)
        {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete a project by ID
export const deleteProjectById = async (req, res) => {
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);



        if(!deletedProject)
        {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json(deletedProject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Delete all projects
export const deleteAllProjects = async (req, res) => {
    try {
        const result = await ProjectModel.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} projects deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//CRUD USERS
import generateToken from "../utils/jwt.js";
import aboutPageModel from "../models/aboutPage.model.js";

//  READ all users
export const getAllUsers = async (req, res) => {
    try {
        const msg = await userModel.find();
        console.log(msg);
        res.status(200).json(msg); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);   
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE a new user
export const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        const savedUser = await newUser.save();

        const token = generateToken(savedUser);

        res.status(200).json({message:"User registered successfully", user:savedUser, token});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// UPDATE an existing user by ID
export const updateUserById = async (req, res) => {
    try {

        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });   
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//DELETE a user by ID
export const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);       
        if(!deletedUser)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete all users
export const deleteAllUsers = async (req, res) => {
    try {
        const result = await userModel.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} users deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Login user
export const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = generateToken(user); // your JWT function

        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Logout user

export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Update token status to revoked - no error to ensure logout proceeds if token isnt in DB (for backend testing)

    await updateTokenStatus(token, "revoked");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

