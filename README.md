https://main--todolist-yeounju.netlify.app/

# useForm (react-hook)


```
// register 함수를 이용
const {register} = useForm<>({})

<input {...register("email", {
  required:true,
  pattern : {
    value:/^[A-Za-z0-9._%+-]+@naver.com$/, // 정규식
    message : "only naver.com allowed
  },
})} placeholder="email" />
```
```
// handlesubmit 함수
interface IForm{ //타입작성}
const {handleSubmit} = useForm<>({})
const onValid = (data:IForm) => {
  console.log(data)
}
<form onSubmit={handleSubmit(onValid)} />
```

