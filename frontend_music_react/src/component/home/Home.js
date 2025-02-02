import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import TopArtist from './homeComponents/topArtists/TopArtist';
import HotVideoclips from './homeComponents/hotVideoclips/HotVideoclips';
import Carrousel from './homeComponents/Carrousel';
import ButtonMR from '../common/ButtonMR' 

import VideoPromo from '../../assets/video_app_Promo.mp4';
import NoticiaImg from '../../assets/SHM_worldTour.png';

import {Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


const Home = ({}) => {


    return (
        <div id="home">
            <section id="noticia">
                <Row>
                    <Col  lg={8} style={{paddinRight:'5em'}}>
                        <Image  fluid src={NoticiaImg} alt="SHM World tour" style={{width:'100%'}}/>
                    </Col>
                    <Col lg={4} style={{padding:'1em', textAlign: 'center'}}>
                        <h1>SWEDISH HOUSE MAFFIA <span className="customGreen">WORLD TOUR</span></h1>
                        <p>Swedish House Mafia announced their first official tour since 2013, planning 44 dates in North America and the UK/Europe in 2022. The group timed the announcement of the Paradise Again tour dates with the release of a new swingle, featuring The Weeknd.</p>
                        <ButtonMR id="buttonShmTour" texto="See events" myHref="https://swedishhousemafia.com/"/>
                    </Col>
                </Row>
            </section>
            <section id="carrousel" className="setHeightCarrousel">
                <Container className="resizeCarrousel">
                    <Carrousel ></Carrousel>
                </Container>
            </section>
            <section id="top_artist">
               <TopArtist/>
            </section>
            <section id="hot_videoclips" >
                 <Container> 
                    <h1 id="titleHotVideos" className="titleSecondary" style={{ 
                        textAlign: 'left'}}>HOT <span className="customGreen">VIDEOCLIPS</span></h1>
                    <hr className="hr"/>
                    <HotVideoclips />
                    <hr className="hr"/>
                </Container>
            </section>
            <section id="join_our_app">
                <div className="centerElementsX" >
                    <h1 style={{display : 'inline'}}>Join our <span className="customGreen">app</span></h1>
                </div>
                <video src={VideoPromo} width="100%"  autoPlay loop muted>
                    <source src={VideoPromo} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </section>
        </div>
    );
}




const mapStateToProps = (state) => {
    return {

    }
}

/*recibe un “state” y obtiene las propiedades de este que vaya a utilizar el componente */
const mapDispatchToProps = {}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Home);