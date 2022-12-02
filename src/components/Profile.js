import '../css/Profile.css'
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Button, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import Login from './Login';
import Context, { AppContext } from '../context/Context';
import { Navigate, useNavigate } from 'react-router-dom';

function Profile() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const context = useContext(AppContext);
    const navigate=useNavigate();
    
    const {
        isLogin, setIsLogin, pdfFile, setPdfFile, fileError, setFileError
        , pdfList, setPdfList, fileList, setFileList, ar, setAr, viewPdf, setViewPdf, onchange, submitFile, uploadPdf, setFil, viewFil,deleteFile
    } = context;
    useEffect(() => {
        if(localStorage.getItem('id')!=null)setIsLogin(true);
        if(isLogin==false)navigate("/login")
        setFil();
        
    }, [])

    const lgOut = () => {
        localStorage.removeItem('id');
        setIsLogin(false);
    }
    return (
       <div className='grid1'> { isLogin?<div className="grid-container">
            {/* 
            <div className='item1'>
                <div className='header'>
                <h4>Welcome</h4>
                <button type='submit' className='btn btn-success btn-lg' onClick={lgOut}>Logout</button>
                </div>

                <form className="form-group " onSubmit={submitFile}>
                    <input type="file" className="form-control" required onChange={onchange} />
                    {fileError && <div className='error-msg'>{fileError}</div>}
                    <br></br>
                    <button type="submit" className="btn btn-success btn-lg" >
                        UPLOAD
                    </button>


                </form>
                <br></br>

            </div>

            <div className='item2 scroll-bar'>
                <h3>Past Uploades</h3>


                {
                    fileList.map((element, index) => {
                        return (
                            <div className='container p-3' key={index}>
                                <h4  >{element.fileName}</h4>
                                <a href={element.downloadURL} >donwload</a>
                                <button className='btn btn-success' type='submit' onClick={() => viewFil(element.fileId)}>view File</button>
                                <button className='btn btn-danger' type='submit'>delete File</button>
                            </div>)
                    })
                }
            </div>
            <div className='item3'>
                <div className='pdf-container'>
                    {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf}
                            plugins={[defaultLayoutPluginInstance]} />
                    </Worker></>}
                    {!viewPdf && <>No pdf file selected</>}

                </div>
            </div>
            <div className='item4'><h4>Footer</h4></div>
 */}
            <div className='left'>
                <div className='p-uploads'><h4>Past Uploads</h4></div>

                <div className='scroll-bar'>


                    {
                        fileList.map((element, index) => {
                            return (
                                <div className='list-item' key={index}>
                                    <h4  >{element.fileName}</h4>
                                    <div className='operations'>
                                        <a className='d-class' href={element.downloadURL} >Donwload</a>
                                        <button className='btn2 btn2-primary btn-sm' type='submit' onClick={() => viewFil(element.fileId)}>View</button>
                                        <button className='btn2 btn-danger btn-sm' type='submit' onClick={()=>deleteFile(element.fileId,index)}>Delete</button>
                                    </div>
                                </div>)
                        })
                    }
                </div>

            </div>
            <div className='right'>
                <form className="f-group " onSubmit={submitFile}>
                    <input type="file" className="f-control" required onChange={onchange} />
                    {fileError && <div className='error-msg'>{fileError}</div>}
                    <button type="submit" className="btn2 btn2-primary btn-sm" >
                        UPLOAD
                    </button>


                </form>
                <div className='pdf-container'>
                    {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf}
                            plugins={[defaultLayoutPluginInstance]} />
                    </Worker></>}
                    {!viewPdf && <>No pdf file selected</>}

                </div>
            </div>

        </div>:<div></div>}
        </div> 
    )
}

export default Profile