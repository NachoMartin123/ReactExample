import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ButtonTable from "./button_table/ButtonTable";

import { useParams } from "react-router-dom";
import {get_artist_songs} from '../../redux/actions/apiActions';

import ButtonPlay from '../common/ButtonPlay';
import { Row} from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { BsClockFill, BsCircleFill } from "react-icons/bs";

import AviciiImg from '../../assets/artistPictures/avicii_PNG.png';
 
const Artist_detail = ({artistSongs, get_artist_songs}) => {
    const { artistName } = useParams(); //hook para recoger params

    const [totalDuration, setTotalDuration] = useState("0 hr 0 min");//initial state value
    const [backOpacity, setBackOpacity] = useState(0);
    const [backSize, setBackSize] = useState("60%");
    //const [imgBack, setImageBack] = useState()

    useEffect( () => {
        get_artist_songs(artistName);
        //setImageBack("url("+"../../assets/artistPictures/" + artistName.toLowerCase().replace(/\s/g, '_') + "_PNG.png" + ")");
    }, [])

    useEffect( () => {
        getTotalDuration();
    })

    useEffect( () => {//control opacity
        const scrollFun = () => {              
            if (window.pageYOffset === 0)     {setBackOpacity("rgba(50, 77, 71, 0)"); setBackSize("60%");}
            if (window.pageYOffset === 50)    {setBackOpacity("rgba(50, 77, 71, 0.25)"); setBackSize("55%");}
            if (window.pageYOffset === 100)   {setBackOpacity("rgba(50, 77, 71, 0.5)"); setBackSize("50%");}
            if (window.pageYOffset === 150)   {setBackOpacity("rgba(50, 77, 71, 0.75)");}
            if (window.pageYOffset === 200)   {setBackOpacity("rgba(50, 77, 71, 0.85)");}
            if (window.pageYOffset === 250)   {setBackOpacity("rgba(50, 77, 71, 1)");}
        }
        window.addEventListener("scroll", scrollFun);

        return () => {
            window.removeEventListener("scroll", scrollFun);
        };
    }, [])

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
    
    return (
        <div className="gradientBack"> 
            <Row id="imgBackArtistDetail" style={{backgroundSize: backSize, backgroundImage:`url(${(AviciiImg)})`}}>
                <div style={{paddingLeft:"10%", background: backOpacity}}>
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
