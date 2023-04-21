import React, { useContext } from "react";
import AuthContext from '../..//store/authContext'

function Home() {

    const auth = useContext(AuthContext);
    return <div>
        Seja bem vindo {auth.user?.name}
    </div>
}


export default Home;