const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({

    username:{
        type:String,
        required:true,
        unique:[true,'({VALUE}), adı zaten alınmış!']
    },
    password:{  
        type:String,
        minlength:[3,'({PATH}), ({MİNLENGTH}) karakterden az olamaz!']
    }

});

module.exports=mongoose.model('user',UserSchema);