function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // get the metadata field
    var metadata = data.metadata;
    console.log("Metadata:", metadata); // this is okay

    // Filter the metadata for the object with the desired sample number

    
    var filteredMetadata = metadata.filter(obj => obj.id === sample)[0];
    console.log("Filtered Metadata:", filteredMetadata); // this is not okay

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var samples = data.samples;


    // Filter the samples for the object with the desired sample number
    var filteredSample = samples.filter(obj => obj.id === sample)[0];


    // Get the otu_ids, otu_labels, and sample_values
    var otuIds = filteredSample.otu_ids;
    var otuLabels = filteredSample.otu_labels;
    var sampleValues = filteredSample.sample_values;


    // Build a Bubble Chart
    var trace1 = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues
      }
    };

    var dataBubble = [trace1];

    var layoutBubble = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: {title:'Number of Bacteria'},
      showlegend: false
    };

    // Render the Bubble Chart
 

    Plotly.newPlot('bubble', dataBubble, layoutBubble);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var yticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var trace2 = {
      x: sampleValues.slice(0, 10).reverse(),
      y: yticks,
      text: otuLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    var dataBar = [trace2];

    var layoutBar = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Sample Values' },
      yaxis: { tickmode: "array", tickvals: yticks, ticktext: yticks }
    };


    // Render the Bar Chart
    Plotly.newPlot('bar', dataBar, layoutBar);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    var names = data.names;


    // Use d3 to select the dropdown with id of `#selDataset`
    var dropdown = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });


    // Get the first sample from the list
    var firstSample = names[0];


    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
