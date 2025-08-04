async function createTemplate() {
    try{
        console.log("Create a new template");
    }catch(error){
        console.log(error);
        process.exit(0);
    }
}

export default createTemplate;