import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/reduxSlice";
import url from "../../components/helper";

const PageLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.search).get("access_token");

        if(accessToken !== null){
            const setProfile = async () =>{
                try{
                    const requestOptions = {
                        headeres: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        },
                    };
                    const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then((data) => data.json());
                        response();
                }catch (error){
                    alert(error);
                }
                };
                dispatch(setToken(accessToken));
                setProfile();
        }
    }, [dispatch]);            
        
    return (
        <>
            <a href={url}>Login</a>
        </>
    );
}

export default PageLogin;
