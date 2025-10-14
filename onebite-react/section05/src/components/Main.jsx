const Main = () => {
    const user = {
        name: "최우수",
        isLogin: false,
    };
    if (user.isLogin){
        return <div>로그아웃</div>

    } else {
        return <div>로그인</div>
    }
//     return (
//        <>
//        {user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}
//        </>
//     );
 };

export default Main;
