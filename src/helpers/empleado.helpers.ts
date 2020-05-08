import {Empleado, IEmpleado} from "../models/empleado.model";

export class EmpleadoHelpers{
    getEmpleado(filtro:any):Promise<IEmpleado>{
        return new Promise<IEmpleado>( (resolve) =>{
            Empleado.find(filtro, (err:Error, Empleado:IEmpleado)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Empleado);
                }
            });
        });
    }
};