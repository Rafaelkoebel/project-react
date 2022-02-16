import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend,  } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
)

const BarChart = () => {

    const [chart, setChart] = useState([])

    var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10"
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var apiKey = 
    "coinranking70234f353495f0fab29a2d6362759f74861c7223356111fd"

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
                    setChart(json.data)
                })
            }).catch(error =>{
                console.log(error);
            })
        }
        fetchCoins()
    }, [])

    
    const data= {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
            label: 'Mon premier test' ,
            data: chart?.coins?.map(x => x.price),
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
        //indexAxis: 'y', //pour horizontal
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
            height={150}
            options={options}

        />
    </div>
  )
}

export default BarChart