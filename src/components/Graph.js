import React from "react";
import { Bar } from "react-chartjs-2";

const Graph = (props) => {
  const data = {
    labels: props.allTime.titleList,
    datasets: [
      {
        data: props.allTime.videosDurationList,
        label: "Minutes",
        backgroundColor: "#FF4444",
        borderWidth: 0.5,
        borderColor: "black",
        hoverBorderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        height={450}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: {
            text: "Duration of videos in the playlist",
            display: true,
            fontSize: 18,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Videos",
                  fontSize: 16,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Graph;
