import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ButtonTable from "./button_table/ButtonTable";

import { useParams } from "react-router-dom";
import {get_artist_songs} from '../../redux/actions/apiActions';

import ButtonPlay from '../common/ButtonPlay';
import { Row} from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { BsClockFill, BsCircleFill } from "react-icons/bs";

import DefaultImg from '../../assets/artistPictures/default.png';
 
const Artist_detail = ({artistSongs, get_artist_songs}) => {
    const { artistName } = useParams(); //hook para recoger params

    const [totalDuration, setTotalDuration] = useState("0 hr 0 min");//initial state value
    const [backOpacity, setBackOpacity] = useState(0);
    const [backSize, setBackSize] = useState(50); 
    const [profileIMG, setProfileIMG] = useState();

    function loadImage () {//set img dinamiclly
        try{
           const images = require.context('../../assets/artistPictures', true);
           setProfileIMG(images('./' +artistName.toLowerCase().replace(/\s/g, '_')+'_PNG.png'));
       }catch{
           setProfileIMG(DefaultImg);
       } 
   };
    
    useEffect( () => {
        get_artist_songs(artistName);
        loadImage();
        const scrollFun = () => {   
            if(window.pageYOffset == 0) {
                setBackOpacity("rgba(50, 77, 71, 0)");
                setBackSize(50);
            }
            if(window.pageYOffset == 100) {//1 scroll down with mouse
                setBackOpacity("rgba(50, 77, 71, 0.5)");
                setBackSize(49);
            }
            if(window.pageYOffset == 200) {//1 scroll down with mouse
                setBackOpacity("rgba(50, 77, 71, 1)");
                setBackSize(48);
            }
            console.log("window.pageYOffset "+window.pageYOffset)

        }
        window.addEventListener("scroll", scrollFun);

        return () => {
            window.removeEventListener("scroll", scrollFun);
        };
    }, [])

    useEffect( () => {
        getTotalDuration();
    })

    function getTotalDuration(){
        var varTotalTimeSeconds =0;

        for (let i = 0; i < artistSongs.length; i++) {
            var arrayDeCadenas = artistSongs[i].duration.split(":");
            varTotalTimeSeconds += parseInt(arrayDeCadenas[0])*60+parseInt(arrayDeCadenas[1]);
        }
        
        var hours = 0;
        var min = 0;

        if(artistSongs.length!==0){
            hours = Math.floor(varTotalTimeSeconds/60/60);
            varTotalTimeSeconds -= hours*60*60;
            min= Math.floor(varTotalTimeSeconds/60);
            varTotalTimeSeconds -= min*60;
        }
        setTotalDuration(hours+" hr "+min+" min");
    }

    const dinamicStyles = {
        
    }


    
    return (
        <div className="gradientBack"> 
            <Row id="imgBackArtistDetail" style={{ backgroundSize: backSize+"%", transition: "all 0.25s",  backgroundImage:`url(${(profileIMG)})`}}>
                <div style={{paddingLeft:"10%", background: backOpacity, transition: "all 0.15s"}}>
                    <h1 style={{paddingTop:'2em'}}>{artistName}</h1>
                    <div>
                    {/*  <ButtonPlay/> */}
                        <div style={{display:"flex"}}>
                            <p style={{fontWeight: "bold"}}>Total songs:&nbsp;</p><p> {artistSongs.length}</p><BsCircleFill className="ballSeparator"/><p style={{fontWeight: "bold"}}> Total duration:&nbsp;</p><p>{totalDuration}</p>
                        </div>
                    </div>
                </div>
            </Row>
            <Row id="tableArtistDetail">
                <Table responsive >
                    <thead >
                        <tr >
                            <th style={{textAlign:'center', width:'10%'}}>#</th>
                            <th>Name</th>
                            <th>Album</th>
                            <th ><BsClockFill/></th>
                        </tr >
                    </thead>
                    <tbody >
                        {
                            artistSongs && artistSongs.length > 0 ?
                                artistSongs.map((item, index) => {
                                    return <ButtonTable key={index} indice={index} artistName={artistName} song={item}/>
                                })
                                : <tr><td colSpan="4">No songs found, check another artist!</td></tr>
                        }
                    </tbody>
                </Table>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        artistSongs: state.apiState.artistSongs
    };
};

export default connect(
    mapStateToProps, 
    {get_artist_songs}
)(Artist_detail);
