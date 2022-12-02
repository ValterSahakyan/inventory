<template>
  <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
</template>
  <script>
    import axios from "axios";

    export default {
      name: 'ChartComponent',
      data(){
        return {
          series: [ 0, 0, 0, 0 ],
          chartOptions: {
            chart: {
              width: 380, type: 'pie',
            },
            labels: [ 'Book', 'Game', 'Gift', 'Material' ],
            responsive: [ {
              breakpoint: 480, options: {
                chart: {
                  width: 200
                }, legend: {
                  position: 'bottom'
                }
              }
            } ]
          },
        }
      },
      mounted() {
        axios.get(`http://localhost:5000/statistic`,{
          headers:{
            'Accept': 'application/json'
          }
        }).then((res) => {
          this.series = [res.data.books, res.data.games, res.data.gifts, res.data.materials];
        })
      },
    }
  </script>
