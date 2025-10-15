import { useState } from "react";

//간단한 회원가입 폼
//1. 이름
//2. 생년월일
//3. 국적
//4. 자기소개


const Register = () => {

    // const [name, setName] = useState("이름");
    // const [birth, setBirth] = useState("");
    // const [country, setCountry] = useState("");
    // const [bio, setBio] = useState("");
    const [input, setInput] =useState({
        name :"",
        birth: "",
        country:"",
        bio:"",
    })

 const onChange = (e)=>{
    setInput({
        ...input,
        [e.target.name]:e.target.value,
    })
 }

    // const onChangeName = (e) => {
    //    // setName(e.target.value);
    //    setInput({
    //     ...input, //스프레드 연산자 이전값 저장
    //     name: e.target.value,
    //    });
    // };

    // const onChangeBirth = (e) => { 
    //     //setBirth(e.target.value);
    //     setInput({
    //     ...input,
    //     birth: e.target.value,
    //    });
    // };
    
    // const onChangeCountry = (e) => {
    //   //  setCountry(e.target.value);
    //    setInput({
    //     ...input,
    //     country: e.target.value,
    //    });
      
    // };
    // const onChangeBio = (e) => {
    //    // setBio(e.target.value);
    //     setInput({
    //     ...input,
    //     bio: e.target.value,
    //    });
    // };

    return (
    <div>
        <div><input name="name"
        value= {input.name} onChange = {onChange} placeholder={"이름"} />
    </div>
    <div>
    <input name="birth" 
    value={input.birth}
    onChange={onChange}
    type="date" />
    </div>
    <div>
        <select name="country"
        value={input.country} onChange={onChange}>
            <option value={""}></option>
             <option value={"kr"}>한국</option>
              <option value={"us"}>미국</option>
               <option value={"uk"}>영국</option>
        </select>
    
    </div>
    <div>
        <textarea name="bio"
        value={input.bio} onChange={onChange}/>
    </div>
    </div>

    
    );
};

export default Register;  