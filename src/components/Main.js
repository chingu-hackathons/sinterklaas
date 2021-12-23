import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

let calorieCount = 0;
let currentSpeed = 10;
let homesRemaining = 0;
let timeSecs = 0;

export default function Main() {
    const [intervalId, setIntervalId] = useState(false)
    const [ffMode, setFfMode] = useState(false)
    const [totalHomes, setTotalHomes] = useState(0)
    const [ homesRemain, setHomesRemain ] = useState(0)
    const [ cookieMilkCount, setCookieMilkCount ] = useState(0)
    const [ carrotTeaCount, setCarrotTeaCount ] = useState(0)

    let calorieTarget = 5000
    let interval;


    const stopSanta = () => {
        if (homesRemaining <= 0) { 
            clearInterval(interval)
         }
    }

    const stopBtn = () => clearInterval(intervalId) 

    const handleChange = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            resetMetrics()
            
            const newVal = parseInt(e.target.value)
            setHomesRemain(newVal)
            homesRemaining = newVal
            e.target.value = ""
        }
    }

    const resetMetrics = () => {

        clearInterval(intervalId)

        calorieCount = 0
        setHomesRemain(0)
        homesRemaining = 0
        timeSecs = 0
        setCookieMilkCount(0)
        setCarrotTeaCount(0)
        currentSpeed = 10
        setTotalHomes(0)
    }

    const fastForward = () => {
        clearInterval(intervalId)
        setFfMode(!ffMode)
        handleClick()
    }

    const handleClick = () => {
        function innerLogic() {
            const cookiesMilk = 15;
            const carrotsTea = -10;
            calorieCount < 5000 && homesRemaining > 10 ? currentSpeed = 10 :
                calorieCount > 5000 && homesRemaining > 10 ? currentSpeed = 5 :
                    currentSpeed = 1
            const nextTen =
                [...Array(currentSpeed)]
                    .map(() =>
                        Math.round(Math.random()) === 1 && calorieCount < 4750 ? cookiesMilk :
                            Math.round(Math.random()) === 1 && calorieCount > 4750 ? Math.floor(cookiesMilk * 0.5) :
                                carrotsTea
                    )
            nextTen.forEach(item => item === cookiesMilk ? setCookieMilkCount(prev => prev += 1) : item === carrotsTea ? setCarrotTeaCount(prev => prev += 1) : null)
            const arrTotal = nextTen.reduce((acc, cur) => acc + cur);

            calorieCount += arrTotal
            setTotalHomes(prev => prev + currentSpeed);
            setHomesRemain(prev => prev - currentSpeed);

            homesRemaining -= currentSpeed;
            
            stopSanta()
        }
        if (!ffMode && homesRemaining > 0) {
            interval = setInterval(() => {
                innerLogic()
                timeSecs += 1
            }, 1000);
            setIntervalId(interval);
        } else if (ffMode && homesRemaining > 0) {
            interval = setInterval(() => {
                innerLogic()
                timeSecs += 0.05
            }, 50);
            setIntervalId(interval);
        } else {
            alert("Please enter value for target # of homes and press enter!")
        }
    }
    
    return (

    //  --- MEDIA QUERIES - PORTRAIT: mobile w:470px / sm:640px / md: 768px / lg:1024px / xl:1280px ---
    // ------------------------------------------------------------------------------------
        
        // --- This should keep dashboard in centre of every device. Seems to with exception of ipad mini in safari, where it rides up a little --- /
        <div className="m-0 flex items-center justify-center h-screen">
            

            {/* --- OUTER Screen --- */}
            <div className="w-[480px] sm:w-3/5 sm:h-auto md:max-w-[500px] lg:w-3/4 lg:max-w-[800px] xl:w-3/5 2xl:w-1/2 m-2 pb-2 bg-gray-800 border border-blue-400 rounded-2xl">
            <container className="rounded">
            
                {/* --- Buttons - Change Screen --- */}
                <div className="mx-4 my-2 sm:my-6 flex justify-evenly">
                    
                        {/* --- metrics --- */}
                        <button className="text-gray-200 lg:text-xl "> <i class="fas fa-chart-line fa-lg"></i></button>
                        {/* --- JSON list --- */}
                        <button className="text-gray-500 lg:text-xl "> <i class="far fa-address-book fa-lg"></i></button>
                    
                </div>

                {/* --- INNER Screen grid --- */}
          
                <div className="mt-2 mb-1 mx-3 sm:m-6 lg:px-1 grid grid-cols-[5px_minmax(1fr)_minmax(1fr)_minmax(1fr)_minmax(1fr)_5px] grid-rows-4 lg:grid-rows-2 text-sm sm:text-base lg:text-lg text-gray-300 bg-slate-800 border border-blue-400 rounded-2xl">
                    
                    <div className="col-start-1 min-w-0 overflow-hidden"></div>

                    {/* --- Calorie Target --- */}
                    <div className="col-start-2 col-span-2 lg:col-start-4 lg:col-span-1 flex flex-col items-center border-dashed border-b border-r border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Calorie Target</div> 
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl">{calorieTarget}</div> 
                    </div>

                    {/* --- Calories so far Tonight --- */}
                    <div className="relative col-start-4 col-span-2 lg:col-start-5 lg:col-span-1 flex flex-col items-center border-dashed border-b border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Calories Tonight</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl">{calorieCount < 0 ? 0 : calorieCount}</div> 
                    
                        {/* --- Warning Light - position:absolute --- */}
                        <div className="col-start-5 absolute top-8 right-1 sm:top-2 sm:-right-3 lg:top-2 lg:right-0">
                            {calorieCount < 4750 ? 
                            <div className="w-5 h-5 bg-gradient-radial rounded-full from-gray-800 via-red-300 to-gray-600 opacity-30">
                            </div> : 
                            <div className="animate-pulse w-5 h-5 bg-gradient-radial rounded-full from-red-600 via-grey-600 to-red-900 opacity-100">
                            </div>}
                        </div>
                    </div>

                    {/* --- Milk / Cookies --- */}
                    <div className="col-start-2 col-span-2 lg:row-start-2 lg:col-start-2 lg:col-span-1 flex flex-col items-center border-dashed border-b border-r lg:border-b-0 border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Milk / Cookies</div>
                        <div className=" mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{cookieMilkCount}</div> 
                    </div>

                    {/* --- Tea / Carrots --- */}
                    <div className="col-start-4 col-span-2 lg:row-start-2 lg:col-start-3 lg:col-span-1 flex flex-col items-center border-dashed border-b lg:border-b-0 lg:border-r border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Tea / Carrots</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{carrotTeaCount}</div>
                    </div>     

                    {/* --- Homes Visited --- */}          
                    <div className="col-start-2 col-span-2 lg:row-start-1 lg:col-start-2 lg:col-span-1 flex flex-col items-center border-dashed border-b border-r border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Homes Visited</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{totalHomes}</div> 
                    </div>

                    {/* --- Homes Remaining --- */} 
                    <div className="col-start-4 col-span-2 lg:row-start-1 lg:col-start-3 lg:col-span-1 flex flex-col items-center border-dashed border-b lg:border-r border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Homes Remain</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{homesRemain}</div> 
                    </div>

                    {/* --- Delivery Speed: homes/second --- */} 
                    <div className="col-start-2 col-span-2 lg:row-start-2 lg:col-start-4 lg:col-span-1 flex flex-col items-center border-dashed border-r border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Delivery Speed</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{currentSpeed} h/s</div> 
                    </div>

                    {/* --- Total Time / seconds --- */} 
                    <div className="col-start-4 col-span-2 lg:row-start-2 lg:col-start-5 lg:col-span-1 flex flex-col items-center border-dashed border-blue-400">
                        <div className="my-2 sm:my-3 lg:my-9 lg:px-6 text-gray-300 text-xs sm:text-base md:text-lg">Total Time</div>
                        <div className="mb-3 sm:mb-4 lg:mb-10 font-mono text-white text-base sm:text-lg lg:text-2xl ">{timeSecs.toFixed(0)}</div>
                    </div>
                    
                    {/* --- Empty Column 6 for padding --- */} 
                    <div className="col-start-6 min-w-0 overflow-hidden"></div>

                </div>

                 {/* --- INPUT & BUTTONs in flex --- */}
                
                <div className="flex flex-col">
                
                    <InputGroup className="mt-1 mb-2 mx-auto text-center">
                        {/* <InputGroup.Text id="basic-addon1" className="m-0 py-1 text-xs sm:text-sm text-center text-gray-200">Enter Target:</InputGroup.Text> */}
                        <Form.Control
                            className="italic py-1 px-3 lg:px-8 text-xs sm:text-sm text-center text-gray-200 placeholder:text-gray-400 bg-gray-800 border border-gray-300 rounded-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            placeholder="Type # and press enter"
                            aria-label="Input House Target for the Night"
                            aria-describedby="basic-addon1"
                            type="text"
                            onKeyDown={e => handleChange(e)}
                        />
                    </InputGroup>

                    {/* --- BUTTONS grid --- */}

                    <div className="mx-4 sm:mt-5 sm:mb-4 sm:mx-6 grid grid-cols-[5px_minmax(1fr)_minmax(1fr)_minmax(1fr)_minmax(1fr)_5px] justify-items-center items-center">
                        
                        <div className="col-start-1"></div>

                        {/* --- Start/Stop Btn --- */}

                        <button className="col-start-2 w-10 h-10 sm:w-14 sm:h-14 mx-1 bg-gradient-radial border border-green-400 from-gray-700 via-green-800 to-green-900 rounded-full text-gray-100  text-opacity-80 opacity-90 text-xs sm:text-base focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            onClick={handleClick}
                        > Start
                        </button>

                        <button className="col-start-3 w-10 h-10 sm:w-14 sm:h-14 mx-1 bg-gradient-radial border border-red-400 rounded-full from-gray-700 via-red-800 to-red-900 text-gray-100 text-opacity-80 opacity-90 text-xs sm:text-base focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            onClick={stopBtn}
                        > Stop
                        </button>
                        

                        {/* --- Reset/Fast-Forward Btn --- */}

                        <button className="col-start-4 w-10 h-10 sm:w-14 sm:h-14 mx-1 bg-gradient-radial border border-yellow-400 from-gray-700 via-yellow-800 to-yellow-900 rounded-full text-gray-100 text-opacity-80 opacity-90 text-xs sm:text-base focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            onClick={fastForward}
                        > FF
                        </button> 

                        <button className="col-start-5 w-10 h-10 sm:w-14 sm:h-14 mx-1 bg-gradient-radial border border-blue-400 from-gray-700 via-blue-800 to-blue-900 rounded-full text-gray-100 text-opacity-80 opacity-90 text-xs sm:text-base focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            onClick={resetMetrics}
                        > Reset
                        </button>


                        <div className="col-start-6"></div>
                    
                    </div>
                    
                </div>

            </container>
            </div>
            {/* --- END outer screen --- */}
        
        </div>
      );
}