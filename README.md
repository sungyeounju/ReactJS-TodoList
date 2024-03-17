# TODO LIST

https://main--todolist-yeounju.netlify.app/

<img width="710" alt="스크린샷 2024-03-17 오후 5 06 20" src="https://github.com/sungyeounju/ReactJS-TodoList/assets/60800627/8ee10479-824c-4425-8d89-997f5cb03559">



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

