import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList (){
    const { register, handleSubmit, formState:{errors} } = useForm();
    const onValid = (data:any) => {
        console.log(data)
    }
    console.log(errors)
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
            <input {...register("firstName",{required:true, minLength:{
                value:5,
                message:"too short"
            }})} placeholder="firstName" />
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