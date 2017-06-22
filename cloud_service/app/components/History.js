import React from "react";
import {Line} from 'react-chartjs-2';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chartData: [],
      chartLabels: [],
      max: 10,
      time: 180
    }

    this.setTime = this.setTime.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
  }

  componentDidMount() {

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(objs) {
          console.log(objs);
          this.setState( { data: objs} );
        }.bind(this));
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.selected === 'temp') {

      var data = this.state.data.map(function(obj) {
        return obj.telemetry.Environmental.temperature * 9/5 + 32;
        //console.log(obj.Environmental);
      })

      this.setState( { chartData: data, chartLabels: data, max: 120 } );

      // var labels = this.state.data.map(function(obj) {
      //   return obj.Environmental.temperature;
      // })
      //
      // this.setState( { chartData: data} );
    }

    if(nextProps.selected === 'solarcurrent') {

      var data = this.state.data.map(function(obj) {
        return obj.telemetry["Solar Controller Monitor"].current;
        //console.log(obj.Environmental);
      })

      this.setState( { chartData: data, chartLabels: data, max: 5000 } );

      // var labels = this.state.data.map(function(obj) {
      //   return obj.Environmental.temperature;
      // })
      //
      // this.setState( { chartData: data} );
    }


  }

  render() {

    var data = {
      labels: this.state.chartLabels,
      datasets: [
          {
            fill: true,
            backgroundColor: 'royalblue',
            borderWidth: 2,
            lineTension: 0.1,
            pointRadius: 0,
            data: this.state.chartData
          }
       ]
    }

    var options = {
      layout: {
        padding: {
          left: 15,
          right: 3,
        },
      },
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
        position: 'top',
      },
      animation: {
        // duration: 100,
        easing: 'linear'
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          position: 'right',
          ticks: {
            min: 0,
            max: this.state.max,
            mirror: false,
           },
          }],
        xAxes: [{
          ticks: {
            min: 0,
            max: 0,
          },
          gridLines: {
            display: false,
            drawTicks: false,
          },
          scaleLabel: {
            display: true,
          },
          ticks: {
            display: false,
          },
        },
        ],
      },
    }


  return (

      <div> <h3>Historical ***TESTING****</h3>

        <div className="historyContainer">

          <div className="historySelect">
            <div>***select component***</div>
          </div>


          <div className="historyGraph">

            <Line data={data}
                options={options}
                width={800}
                height={800}
            />

          </div>

        </div>

      </div>
    )
  }
}
export default History;
