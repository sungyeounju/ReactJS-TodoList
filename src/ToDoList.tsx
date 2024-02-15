import { useState } from "react";
import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";

interface IForm{
    email? : string;
    firstName? : string;
    lastName? : string;
    userName? : string;
    passworld? : string;
    passworld1? : string;
    extraError?:string;
}

function ToDoList (){
    const { register, handleSubmit, formState:{errors},setError } = useForm<IForm>({
        defaultValues:{
            email:"@naver.com"
        }
    });
    const onValid = (data:IForm) => {
        console.log(data)
        if(data.passworld !== data.passworld1){
            setError("passworld1",{message:"not same!!!!!!"},{shouldFocus:true})
        }
    }
    //setError("extraError",{message:"server online"})
    return (
    <>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("email",{
                required:true,
                pattern:{
                    value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                    message:'Only naver.com emails allowed'
                },
            })} placeholder="email" />
            <span>{errors?.email?.message as string}</span>
            <input {...register("firstName",{
                required:true,
                validate:{
                    noJenna : (value) => 
                        value?.includes("jenna") ? "no jenna allowed" : true,
                }                
            })} placeholder="firstName" />
            <span>{errors?.firstName?.message as string}</span>
            <input {...register("lastName",{required:true})} placeholder="lastName" />
            <span>{errors?.lastName?.message as string}</span>
            <input {...register("userName",{required:true})} placeholder="userName" />
            <span>{errors?.userName?.message as string}</span>
            <input {...register("passworld",{required:true})} placeholder="passworld" />
            <span>{errors?.passworld?.message as string}</span>
            <input {...register("passworld1",{required:"passworld required"})} placeholder="passworld1" />
            <span>{errors?.passworld1?.message as string}</span>
            <button>add</button>
        </form>
    </>
    )
}
export default ToDoList;