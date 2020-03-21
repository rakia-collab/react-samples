export function selectModelIndex(models, modelRef)
{

    var i=0;
   models.map((Model) => {
        if(Model.modelGeneralData.modelRef===modelRef)
        {
         return i;
        }
        i=i+1;
    }  );

}