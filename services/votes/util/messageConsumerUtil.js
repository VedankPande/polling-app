
const handleDelete = (message,model)=>{

    //delete document
    model.deleteOne({poll: message.id},{test:"Testvalue"}).then(()=>{
        console.log(`vote document deleted for ${message.id}`)
      }).catch((error)=>{
        //TODO: For rollback, retry functionality? Can't undo delete on polls (maybe with an oplog you can)
        console.log(error)
      })

}

const handleSave = (message,model)=>{
    var votes = []
                
    //create a hashmap with votes and counts
    for (const option of message.options){
      votes.push({option,count:0})
    }
    
    //save votes document
    model.create({poll: message._id,votes}).then((doc)=>{
        console.log(doc)
    }).catch((error)=>{
      //TODO: Add rollback delete here
        console.log(error)
    })
}

export { handleDelete,handleSave }