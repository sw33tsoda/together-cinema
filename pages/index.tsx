import Head from 'next/head'
import Nav from '../components/Nav'
import MoviesList from '../components/MoviesList';
import NowPlayingMoviesSwiper from '../components/NowPlayingMoviesSwiper';
import SectionTitle from '../components/SectionTitle';
import styles from '/styles/Home.module.css'
import VideoPlayer from '../components/VideoPlayer';
import PageContent from '../layouts/PageContent';
import { useState } from 'react';
import classnames from 'classnames';
import MovieChart from '../components/MovieChart';

const tabsList = [
  {name:'popular',title:'Đang nổi',engTitle:'Popular'},
  {name:'now_playing',title:'Đang chiếu',engTitle:'Now Playing'},
  {name:'upcoming',title:'Sắp chiếu',engTitle:'Upcoming'},
];


export default function Home() {
  const [currentTab,setCurrentTab] = useState(tabsList[0]);

  return (
    <div id="home">
      <Head>
        <title>TOGETHER CINEMA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      <PageContent>
        <NowPlayingMoviesSwiper/>
        <div className="movie-tabs">
          {tabsList.map((tab,index) => (
            <div className={classnames('movie-tabs__tab-item',{
              'movie-tabs__tab-item--active':tab.name == currentTab.name
            })} key={index} onClick={() => setCurrentTab({...tab})}>
              <p>{tab.title}</p>
            </div>
          ))}
        </div> 
        <MoviesList maxItem={10} category_name={currentTab.name}/>
        {/* <MovieChart/> */}
        {/* <SectionTitle id="popular" title="Đang nổi" engTitle="Popular"/> */}
        {/* <SectionTitle id="now-playing" title="Đang chiếu" engTitle="Now Playing"/>
        <MoviesList maxItem={10} status="now_playing"/>
        <SectionTitle id="upcoming" title="Sắp chiếu" engTitle="Upcoming"/>
        <MoviesList maxItem={20} status="upcoming"/> */}
        <VideoPlayer/>
      </PageContent>
    </div>
  )
}
