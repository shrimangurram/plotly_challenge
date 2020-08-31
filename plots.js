function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      buildMetadata(sampleNames[0]);
      buildCharts(sampleNames[0]);
  })}

  //function optionChanged(newSample) {
  //  console.log(newSample);
  //}

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID : " + result.id);
      PANEL.append("h6").text("ETHNICITY : " + result.ethnicity);
      PANEL.append("h6").text("GENDER : " + result.gender);
      PANEL.append("h6").text("AGE : " +  result.age);
      PANEL.append("h6").text("LOCATION : " + result.location);
      PANEL.append("h6").text("BBTYPE : " + result.bbtype);
      PANEL.append("h6").text("WFREQ : " + result.wfreq);
    });
   }

    function buildCharts(sample) {
        d3.json("samples.json").then((data) => {
          var metadata = data.samples;
          var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
          console.log(resultArray);
          var sample_values = metadata.filter(sampleObj => sampleObj.id == sample).map(sampleval => sampleval.sample_values);
          var otu_ids = metadata.filter(sampleObj => sampleObj.id == sample).map(otuid => otuid.otu_ids);
          var otu_labels = metadata.filter(sampleObj => sampleObj.id == sample).map(otulabel => otulabel.otu_labels);
          sample_values = sample_values[0].slice(0,10);
          sample_values.reverse();
          otu_ids = otu_ids[0].slice(0,10);
          otu_ids = otu_ids.map(ouid => "OTU " + ouid);
          otu_ids = otu_ids.reverse();
          otu_labels = otu_labels[0].slice(0,10);
          otu_labels.reverse();
          var barchartdata = [{
            type: 'bar',
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            orientation: 'h'
          }];

          var barchartlayout = {
            title: 'Top 10 bacterial species (OTUs)',
          };

          Plotly.newPlot('bar', barchartdata, barchartlayout);

          var smp_values = metadata.filter(sampleObj => sampleObj.id == sample).map(sampleval => sampleval.sample_values);
          smp_values = smp_values[0];
          var oids = metadata.filter(sampleObj => sampleObj.id == sample).map(otuid => otuid.otu_ids);
          oids = oids[0];
          var olabels = metadata.filter(sampleObj => sampleObj.id == sample).map(otulabel => otulabel.otu_labels);
          olabels = olabels[0];
          var trace1 = {
            x: oids,
            y: smp_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: oids,
              size: smp_values
            }
          };
          
          var bubblechartdata = [trace1];

          var bubblechartlayout = {
            title: 'Bubble Chart for Bacterial Species (OTUs)',
            xaxis: {title: 'OTU ID'}
          };
          
          Plotly.newPlot('bubble', bubblechartdata, bubblechartlayout);

    });
}

  init();