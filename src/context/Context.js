import React, { createContext, useState, useEffect } from 'react'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Navigate, useNavigate } from 'react-router-dom';

const AppContext = createContext();

export { AppContext };

const Context = (props) => {
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [isLogin, setIsLogin] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [pdfList, setPdfList] = useState([]);
    const [fileList, setFileList] = useState([])
    const [ar, setAr] = useState([]);
    const [viewPdf, setViewPdf] = useState(null);
    const[id,setId]=useState(-1);
    var value=[];

    const fileType = ['application/pdf']
    
    const register= async (userName,email,password)=>{
        const response = await fetch(`http://localhost:8082/register`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
              },
            body:JSON.stringify({userName,email,password})
        });
        const res = await response.json();
          console.log(res);
    }
    const login= async (email,password)=>{
        const response = await fetch(`http://localhost:8082/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
              },
            body:JSON.stringify({email,password})
        });
        const res = await response.json();
         
        if(res.userId!=-1){
            localStorage.setItem('id',res.userId.toString());
            setId(parseInt(localStorage.getItem('id')));
            setIsLogin(true);
            return true;
    
        }
         return false;
    }
    const deleteFile =async (fid,index)=>{
        const response = await fetch(`http://localhost:8082/delete/${fid}`, {
            method: 'DELETE',
        });
        const res = await response.json();
     value= fileList.filter((no,index)=>no.fileId!=fid);
    setFileList(value);
    setViewPdf(null);
              
    }

    const onchange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file && fileType.includes(file.type)) {
                console.log(file)
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setFileError('')
                    setAr(ar.concat(file))
                }
            }
            else {
                setPdfFile(null);
                setFileError("select valid pdf file")
            }
        }
        else {
        }
    }
    const submitFile = (e) => {
        e.preventDefault();

        if (pdfFile !== null) {

            setViewPdf(pdfFile)
            setPdfList(ar);
            uploadPdf(ar[ar.length - 1])
        }
        else {
            setViewPdf(null);
        }
    }
    const uploadPdf = async (file) => {
        let formData = new FormData();
        formData.append('file', file)
        const response = await fetch(`http://localhost:8082/upload/${id}`, {
            method: 'POST',
            body: formData
        });
        const res = await response.json();
        setFil();
    }
    const setFil = async () => {
        console.log(id)

        const response = await fetch(`http://localhost:8082/downloadAll/${id}`, {
            method: 'GET',
        });
        const res = await response.json();
        setFileList(res);
        console.log(viewPdf)


    }
    const viewFil = async (fid) => {
        const response = await fetch(`http://localhost:8082/getFile/${fid}`, {
            method: 'GET',
        });
        const res = await response.json();
        setViewPdf(`data:application/pdf;base64,${res.data}`)
    }



    return (
        <AppContext.Provider value={{
            isLogin, setIsLogin, pdfFile, setPdfFile, fileError, setFileError
            , pdfList, setPdfList, fileList, setFileList, ar, setAr, viewPdf, setViewPdf, onchange, submitFile, uploadPdf, setFil, viewFil,register,login,deleteFile
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default Context;
