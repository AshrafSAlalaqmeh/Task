const {Pool}= require ('pg');
const connectionString = 'postgres://majgdkbb:Tp8cSsk8wtR5i1zFVde2NVs3asKVm8nN@trumpet.db.elephantsql.com/majgdkbb'

const pool = new Pool({
    connectionString
})

pool.connect((err , pool)=>{
    if(err){
        console.error('client didn\'t connect', err.message, err.stack);
        return
    }
    console.log('pool connected on ' + pool.user);

})

module.exports ={pool}