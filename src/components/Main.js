import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
// import stars from 'public/images/star-bgImg-kai-pilger-unsplash.jpeg'

let calorieCount = 0;
const cookiesMilk = 15;
const carrotsTea = -10;
let currentSpeed = 10;
let homesRemaining = 0;
let timeSecs = 0;
let cookieMilkCount = 0;
let carrotTeaCount = 0;

export default function Main() {
    const [intervalId, setIntervalId] = useState(false) // previously setIntervalId was declared but not used. The StackOverflow solution said to put it above the `else` below
    const [ffMode, setFfMode] = useState(false)
    const [totalHomes, setTotalHomes] = useState(0)

    let calorieTarget = 5000
    let interval;


    const handleClick = () => {
        function innerLogic() {
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
            nextTen.forEach(item => item === cookiesMilk ? cookieMilkCount += 1 : item === carrotsTea ? carrotTeaCount += 1 : null)
            const arrTotal = nextTen.reduce((acc, cur) => acc + cur);

            calorieCount += arrTotal;
            setTotalHomes(prev => prev += currentSpeed);
            homesRemaining -= currentSpeed
            stopSanta()
            
        }
        if (!ffMode) {
            interval = setInterval(() => {
                innerLogic()
                timeSecs += 1
            }, 1000);
            // Chris - I added below line from the stack overflow.
            setIntervalId(interval); 
        } else if (ffMode) {
            interval = setInterval(() => {
                innerLogic()
                timeSecs += 0.05
            }, 50);
            setIntervalId(interval);
        } else {
            alert("Please enter value for target # of homes!")
        }
    }

    const stopSanta = () => {
        if (homesRemaining === 0) { 
            clearInterval(interval)
         }
    }

    // Chris - added stop button from StackOverflow solution. Passing intervalId and not interval as above for stopSanta. No idea why ;) State? //
    const stopBtn = () => clearInterval(intervalId) 
    // ---------------------------------------------- //

    const handleChange = (e) => {
        e.preventDefault();
        homesRemaining = e.target.value
    }

    const resetMetrics = () => {
        calorieCount = 0
        homesRemaining = 0
        timeSecs = 0
        cookieMilkCount = 0
        carrotTeaCount = 0
        currentSpeed = 10
        setTotalHomes(0)
    }

    const fastForward = () => {
        clearInterval(intervalId)
        setFfMode(!ffMode)
        handleClick()
    }
    
    return (
    /* --- BACKGROUND - problems!!! Something different about CRA and Tailwind I think --- */

    //  --- MEDIA QUERIES - PORTRAIT: mobile w:470px / sm:640px / lg:1024px / xl:1280px ---
    //                      LANDSCAPE: 
    // ------------------------------------------------------------------------------------
        
        <div className="m-0 flex items-center justify-center h-screen">
            

            {/* --- OUTER Screen --- */}
            <div className="w-[470px] sm:w-3/5 md:w-1/2 sm:h-auto m-3 pb-3 bg-gray-800 border border-blue-400 rounded-2xl">
            <container className="rounded">
            
                {/* --- Buttons - Change Screen --- */}
                <div className="mx-4 my-2 sm:my-6 flex justify-evenly">
                    
                        {/* --- metrics --- */}
                        <button className="text-gray-200"> <i class="fas fa-chart-line fa-lg"></i></button>
                        {/* --- JSON list --- */}
                        <button className="text-gray-500"> <i class="far fa-address-book fa-lg"></i></button>
                    
                </div>

                {/* --- INNER Screen --- */}
          
                <div className="my-3 mx-3 sm:m-6 p-3 sm:px-3 sm:py-1 bg-slate-800 border border-blue-400 rounded-2xl grid grid-cols-2 text-sm sm:text-base text-gray-300">
                    
                    <div className="flex flex-col items-center border-dashed border-b border-r border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Calorie Target</div> 
                        <div className="font-mono text-white text-base sm:text-lg mb-3 sm:mb-4">{calorieTarget}</div> 
                    </div>
                    <div className="relative flex flex-col items-center border-dashed border-b border-blue-400">
                    {calorieCount < 4750 ? <div className="absolute w-5 h-5 -top-1 -right-2 bg-gradient-radial rounded-full from-gray-800 via-red-800 to-red-900 opacity-90">
                    </div> : <div className="animate-pulse absolute w-5 h-5 -top-1 -right-2 bg-gradient-radial rounded-full from-red-600 via-grey-600 to-red-900 opacity-100">
                    </div>}
                    <div className="text-gray-300 mt-1 mb-2">Calories Tonight</div>
                    <div id="santa-calories" class="mb-2 font-mono text-white">{calorieCount < 0 ? 0 : calorieCount}</div> 
                    </div>
                    <div className="flex flex-col items-center border-dashed border-b border-r border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Milk / Cookies</div>
                        <div id="total-milk-cookies" class=" mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{cookieMilkCount}</div> 
                    </div>
                    <div className="flex flex-col items-center border-dashed border-b border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Tea / Carrots</div>
                            <div id="total-carrots-tea" class="mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{carrotTeaCount}</div>
                    </div>                    
                    <div className="flex flex-col items-center border-dashed border-b border-r border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Homes Visited</div>
                        <div id="homes-visited" class="mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{totalHomes}</div> 
                    </div>
                    <div className="flex flex-col items-center border-dashed border-b border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Homes Remain</div>
                        <div id="homes-remaining" class="mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{homesRemaining <= 0 ? 0 : homesRemaining}</div> 
                    </div>
                    <div className="flex flex-col items-center border-dashed border-r border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Delivery Speed</div>
                        <div id="homes-per-second" class="mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{currentSpeed} h/s</div> 
                    </div>
                    <div className="flex flex-col items-center border-dashed border-blue-400">
                        <div className="text-gray-300 my-2 sm:my-3">Total Time</div>
                        <div id="time-ms" class="mb-3 sm:mb-4 font-mono text-white text-base sm:text-lg">{timeSecs.toFixed(0)}</div>
                    </div>
                </div>

                {/* --- Start/Stop Btn & Input --- */}
                <div className="mx-4 sm:mt-5 sm:mb-4 sm:mx-6 grid grid-cols-2 justify-items-center items-center">
                    
                    {/* --- Buttons --- */}
                    <div className="flex justify-center">
                        <button className="w-10 h-10 sm:w-14 sm:h-14 mr-2 sm:ml-3 bg-gradient-radial from-gray-800 via-green-800 to-green-900 rounded-full text-gray-100 opacity-90 text-xs sm:text-base"
                            onClick={handleClick}
                        > Start
                        </button>
                        <button className="w-10 h-10 sm:w-14 sm:h-14 ml-2 sm:l-3 bg-gradient-radial rounded-full from-gray-800 via-red-800 to-red-900 text-gray-100 opacity-90 text-xs sm:text-base"
                            onClick={stopBtn}
                        > Stop
                        </button>
                        {/*New reset button*/}
                        <button className="w-10 h-10 sm:w-14 sm:h-14 mr-2 sm:ml-3 bg-gradient-radial from-gray-800 via-green-800 to-green-900 rounded-full text-gray-100 opacity-90 text-xs sm:text-base"
                            onClick={resetMetrics}
                        > Reset
                        </button>
                        {/*New fast forward button*/}
                            <button className="w-10 h-10 sm:w-14 sm:h-14 mr-2 sm:ml-3 bg-gradient-radial from-gray-800 via-red-800 to-red-900 rounded-full text-gray-100 opacity-90 text-xs sm:text-base"
                            onClick={fastForward}
                        > FF
                        </button>
                            
                    </div>

                    {/* --- INPUT - has styling issues --- */}

                    <InputGroup className="">
                    {/* <InputGroup.Text id="basic-addon1">Target</InputGroup.Text> */}
                    <Form.Control
                        className="italic m-0 py-1 text-xs sm:text-sm text-center text-gray-200 placeholder:text-gray-400 bg-gray-800 border border-gray-300 rounded-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        placeholder="House Target"
                        aria-label="Input House Target for the Night"
                        aria-describedby="basic-addon1"
                        type="text"
                        onChange={e => handleChange(e)}
                    />
                </InputGroup>
                </div>
                
            </container>
            </div>
            {/* --- END outer screen --- */}
        
        </div>
      );
}