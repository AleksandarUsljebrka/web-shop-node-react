const sql = require('mssql/msnodesqlv8');

const config ={
    server:'DESKTOP-BE2QTST\\SQLEXPRESS',
    database:'WebShopNR',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true,
        trustServerCertificate:true,
    }
}
module.exports = {
    connect:()=>sql.connect(config, function(err){
        var req = new sql.Request();
        req.query("select * from photo", (err, records)=>{
            console.log(records);
            
        })
    }),
    sql
}