import React, { useState, useRef, useEffect } from "react";

import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import './styles/app.css'

import ironMan from './images/iron-man.jpg';
import nova from './images/Nova.png';
import falcon from './images/falcon.jpg';
import lizard from './images/Lizard.jpg'
import deadpool from './images/deadpool.jpg'

import { getDatabase, ref, child, get } from "@firebase/database";
import WinScreen from "./components/WinScreen";
import Footer from "./components/Footer";

function App() {

  let startArr = [
    {name: 'IRON MAN', img: ironMan, urlName: 'IRONMAN', borderColor: 'green', id: 'irmn'},
    {name: 'NOVA', img: nova, urlName: 'NOVA', borderColor: 'green', id: 'nova'},
    {name: 'FALCON', img: falcon, urlName:'FALCON', borderColor: 'green', id: 'flcn' },
    {name: 'LIZARD', img: lizard, urlName: 'LIZARD', borderColor: 'green', id: 'lzrd'},
    {name: 'DEADPOOL', img: deadpool, urlName: 'DEADPOOL', borderColor: 'green', id: 'ddpl'}
]

  const [location, setLocation] = useState({}) 
  const [found, setFound] = useState(false)
  const [characArr, setCharacArr] = useState([...startArr])
  const [characName, setChName] = useState(false)
  const [win, setWin] = useState(false)

  const gameBoardRef = useRef(null)

  const getOffset = (e) => {
    e.preventDefault();
    const height = gameBoardRef.current.offsetHeight;
    const width = gameBoardRef.current.offsetWidth;

    return setLocation({
        x: numToPerc(width ,e.nativeEvent.offsetX), 
        y: numToPerc(height ,e.nativeEvent.offsetY)
    })
  }

  const numToPerc = (t,p) => {
    return Math.round((p/t)*100)
  }

  const compare = (urlName,location) => {

    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${urlName}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let obj = {...snapshot.val()}

        if(location.x <= obj.coordX + 5 && location.x >= obj.coordX - 5 
          && location.y <= obj.coordY + 5 && location.y >= obj.coordY - 5 
        ){
          return setFound(obj.name)
        }
        return setFound(false)
      } else {
        console.log("No data available");
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    const tempArr = [...characArr]
    if(found !== false){
      for(const prop in tempArr){
        if(tempArr[prop].name === found){
          tempArr[prop].borderColor = 'red';
          tempArr[prop].id += 'FOUND';
          setCharacArr([...tempArr])
          setChName(found)
          setFound(false)
          break;
        }
        continue;
      }
    }
  }, [found])

  useEffect(() => {
    if(characName !== false){
      setTimeout(() => {setChName(false)}, 3000)
    }
  }, [characName])

  useEffect(() => {
    let check = characArr.reduce((a,b) => { return (a.borderColor === b.borderColor) ? a : false })
    if(check.borderColor === 'green'){
      return
    }
    if(check === false){
      return
    }else{
      setWin(true)
    }

  }, [characArr])

  if(!win){
    return (
      <div className="App">
        <Header characArr={characArr}/>
        <div className='overflow-div'>
          <GameBoard characArr={characArr} 
            location={location} 
            getOffset={getOffset} 
            gameBoardRef={gameBoardRef} 
            compare={compare}
            characName={characName}
            />
        </div>
      </div>
    );
  }else{
    return (
      <div>
        <Header characArr={characArr}/>
        <WinScreen/>
        <Footer/>
      </div>
    )
  }
}

export default App;
