import {NextFunction, Request , Response} from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';
import SkillsModel from '../model/SkillsModel';
import PersonalDetailsModel from '../model/PersonalDetailsModel';


const getResume =async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get skills, returning only the 'skill' field
        const skills = await SkillsModel.find({}, 'skill').lean();

        // Get personal details, removing the __v field
        const details = await PersonalDetailsModel.findOne({}, { __v: 0 }).lean();

        // Check if details exist
        if (!details) {
            return httpResponse(res, 404, responseMessage.NOTFOUND("Personal details "),);
        }

        // Send the success response
        return httpResponse(res, 200, responseMessage.SUCCESS, {
            details: details,
            skills: skills
        });
    } catch (err) {
        // Pass error to the global error handler
        httpError(next, err, req, 500);
    }
}

const addSkills = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {skill, proficiency} = req.body;
        if(!skill){
            throw new Error(responseMessage.NOTFOUND('Skill required'));   
        }
        const existingSkill = await SkillsModel.findOne({ skill });
        if(existingSkill){
            throw new Error(responseMessage.ALREADYEXISTS('Skill already exists'));
        }

       let newSkill =  await SkillsModel.create({
        skill,
        proficiency: proficiency || 'expert' // Default to 'expert' if not provided
    });
        
        httpResponse( res, 200, responseMessage.SUCCESS,newSkill ); 
        return;
     }catch(err){
        if(err as Error){
            httpError(next, err, req, 400);
        }
         httpError(next, err, req, 500);
         return;
     }
}
const deleteSkills = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        
        httpResponse( res, 200, responseMessage.SUCCESS, {'name': 'Rehan'}); 
     }catch(err){ if(err as Error){
        httpError(next, err, req, 400);
    }
         httpError(next, err, req, 500);
     }
}

const addPersonalDetails = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {name, about, phoneNumber, email, linkedIn, github, city, profession} = req.body;
        
        if( !name || !about|| !phoneNumber|| !email||!linkedIn|| !github || !city|| !profession ){
            throw new Error(responseMessage.NOTFOUND('Required Fields: name, profession, about, phoneNumber, email, linkedIn, github, city'));
        }
        let user =await PersonalDetailsModel.create({
            name,
            about,
            profession,
            phoneNumber,
            email,
            linkedIn,
            github,
            city
        });
        httpResponse( res, 200, responseMessage.SUCCESS, user); 
     }catch(err){
        if(err as Error){
            httpError(next, err, req, 400);
        }
         httpError(next, err, req, 500);
     }
}

const updatePersonalDetails = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        
        httpResponse( res, 200, responseMessage.SUCCESS, {'name': 'Rehan'}); 
     }catch(err){
        if(err as Error){
            httpError(next, err, req, 400);
        }
         httpError(next, err, req, 500);
     }
}
export default{
   getResume,
   addSkills,
   addPersonalDetails,
   updatePersonalDetails,
   deleteSkills ,
}