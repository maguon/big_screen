import { useEffect, useRef } from 'react'
import './NumberCard.css'

const NumberCard = (props) =>{
    const {entity, num} = props
    const numberArray = Array.from(String(num),Number)
    //const numberRefArray = numberArray.map(() => useRef(null));
    const numberRefArray = useRef([]);
    
    useEffect(()=> {
        
        
        // console.log(numberRefArray.current[0].querySelectorAll('li.active'))
        // console.log(numberRefArray.current[0].querySelectorAll('li'))
        // console.log(numberArray)
        
    }, [])

    useEffect(()=>{
        console.log(num)
        for(let j=0;j<numberRefArray.current.length;j++){
            console.log(j+" querySelectorAll ")
            const activeList = numberRefArray.current[j].querySelectorAll('li.active');
            const liArray = numberRefArray.current[j].querySelectorAll('li')
            if(activeList.length >0){
                const currentVal = Number.parseInt(activeList[0].querySelectorAll('div.up div.inn')[0].innerText,10);
                if(currentVal < numberArray[j]) {
                    for(let i=currentVal; i<numberArray[j];i++){
                        if(i>0){
                            liArray[i-1].classList.remove('before')
                        }
                        liArray[i].classList.add('before')
                        liArray[i].classList.remove('active')
                        liArray[i+1].classList.add('active')
                        //numberRefArray.current[j].closest('.container').add('play')                    
                    }
                } else {
                    for(let i=currentVal; i>numberArray[j];i--){
                        if(i>0){
                            liArray[i].classList.remove('active')
                        }
                        liArray[i-1].classList.add('active')
                        //numberRefArray.current[j].closest('.container').add('play')                    
                    }
                }
            }else {            
                for(let i=0; i<numberArray[j];i++){
                    /* const intervalId = setInterval(() => {
                        clearInterval(intervalId)
                    }, 300); */
                    if(i>0){
                        liArray[i-1].classList.remove('before')
                    }
                    liArray[i].classList.add('before')
                    liArray[i].classList.remove('active')
                    liArray[i+1].classList.add('active')
                    
                }
            }
        }
    },[num])
    return(
       <div  className="container play">
        {numberArray.map((item,index) => {
            return (
                <ul key={`Number_test_${index}`} className="flip" ref={el => (numberRefArray.current[index] = el)}>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">0</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">0</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">1</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">1</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">2</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">2</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">3</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">3</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">4</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">4</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">5</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">5</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">6</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">6</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">7</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">7</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">8</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">8</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">9</div>
                            </div>
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">9</div>
                            </div>
                        </a>
                    </li>
                </ul>
            )
        })}
       </div>
    )
}

export default NumberCard;