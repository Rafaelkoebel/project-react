import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {

    const [chart, setChart] = useState([])

    var baseUrl ="https://api.coinranking.com/v2/coins"
    var proxyUrl ='https://cors-anywhere.herokuapp.com/corsdemo'
    var apiKey ="coinranking70234f353495f0fab29a2d6362759f74861c7223356111fd"

    useEffect(() => {
        const fetchCoins = async () => {
            await fetch (`${proxyUrl}${baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((response) => {
                response.json().then((json) =>{
                    console.log(json)
                })
            }).catch(error =>{
                console.log(error);
            })
        }
        fetchCoins()
    }, [])


    const data= {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]

    }

    const options = {
        maintainAspectRadio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

  return (
    <div>
        <Bar 
            data={data}
            height={100}
            options={options}

        />
    </div>
  )
}

export default BarChart