import { useEffect, useState } from 'react'

export default function SantaList() {
    const [ kids, setKids ] = useState([])
    const [ toys, setToys ] = useState([])

    const getData = () => {
        fetch('data.json', { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then(res => res.json())
            .then(data => setToys(data))
    }

    useEffect(() => {
        fetch(`https://fakerapi.it/api/v1/persons?_quantity=80`)
            .then(res => res.json())
            .then(data => setKids(data.data))
            .catch(err => console.error(err))

        getData()
    }, [])

    const rando = Math.round((Math.random() * 40))
    console.log(rando)
    
    return (
        <div className="text-white text-center">
            <h1 className='text-2xl'>Naughty or Nice List</h1>
            <div className="flex">
                <div>
                    <div className="flex flex-col">
                        {kids.filter((user, i) => i <= 40).map((users, i) =>
                            <ul key={toys.id}>
                                <li>{`${users.firstname} ${users.lastname}`}</li>
                                <li className="text-sm">{toys[i].toy}</li>
                            </ul>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    )
}