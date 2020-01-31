export default function(plantToAdd,reloadFavourites=null){
    // Load the plants from localstorage
    const plant1 = localStorage.plant1 ? JSON.parse(localStorage.plant1): {}
    const plant2 = localStorage.plant2 ? JSON.parse(localStorage.plant2) : {}
    console.log(plant2)
    if(plant1.data){ // Plant 1 exists
        console.log(plant2,plant2.date , plant1.date)
        if(plant2.data && plant2.date > plant1.date){ // Plants 2 exists and 2 is newer than 1 (favorite should override 1)
            
            const plant = {
                data:plantToAdd. id,
                date:new Date().getTime(),
                name:plantToAdd.cname
            };
            console.log(plant,1)
            localStorage.plant1=JSON.stringify(plant);
            
        }else{
            // Either doesnt exist or is older - either way overwrite 2
            const plant = {
                data:plantToAdd.id,
                date:new Date().getTime(),
                name:plantToAdd.cname
            };
            console.log(plant,2)
            localStorage.plant2=JSON.stringify(plant);
        }
    }else{
        // 1 doesnt exist, so place favourite in there
        const plant = {
            data:plantToAdd.id,
            date:new Date().getTime(),
            name:plantToAdd.cname
        };
        console.log(plant,1,2)
        localStorage.plant1=JSON.stringify(plant);
    }

    if (reloadFavourites) {
        reloadFavourites();
    } else {
        console.log("NO reloadFavourites",reloadFavourites)
    }
}