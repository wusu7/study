const Button = ({text, color = "black", children}) => {
    
    const onClickButton = (e) =>{
        console.log(e);
        console.log(text);
    }
    return (
    <button 
    onClick={
onClickButton
    }
        style={{color: color}}>{text}-{color.toUpperCase()}</button>);
};

export default Button;