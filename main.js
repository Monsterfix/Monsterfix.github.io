//d3-forcebubble SAC custom widget Version 1.0.0. Copyright 2020 Arijit Das.
(function () {
  let template = document.createElement("template");
  template.innerHTML = `<div></div>
  <style>
  .node rect {
    stroke: #333;
    fill: #fff;
  }
  
  .edgePath path {
    stroke: #333;
    fill: #333;
    stroke-width: 1.5px;
  }
  .circleDefault{stroke:#444;stroke-width:0.5px;stroke-opacity:0.5;}
  .circleUnselecetd{fill-opacity:0.5!important;stroke:#444;stroke-width:0.5px;stroke-opacity:0.5;}
  .circleDefaultHover{stroke:#444;stroke-width:1px;stroke-opacity:1;cursor:pointer;}
  .circleUnselecetdHover{stroke:#444;fill-opacity:0.5!important;stroke-width:1px;stroke-opacity:1;cursor:pointer;}
  .title{font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;}
  .average{font-family:Arial,Helvetica,sans-serif;font-size:10px;}
  .topBar{margin:5px;padding:0 5px 0 0px;}.topBar>table{width:100%;height:30px;}
  .topBar>table>tr>td:nth-child(2){text-align:right;}.chartContainer{height:100%;}
  .noData{text-align:center;width:100%;}.rootTable{height:100%;border-spacing:0px;}
  .rootTable>tbody>tr>td{width:100%;height:100%;}#button{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;outline:0;}
  #button:focus{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;outline:0;}
  #button:hover{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.8);font-family:verdana;min-width:8px;cursor:pointer;}
  #button:active{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;cursor:pointer;}
  .legendContainer{float:right;background-color:rgba(255,255,255,0.9);height:100%;width:150px!important;}
  .legendContainerHidden{display:none;}
  .legendName{font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;}</style>`;
  class FBUBBLE extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = this.d3ForceBubbleDefaultSettings();
      this._init = true;
      this._firstUpdate = true;
      this._firstResize = true;
      this._selectionEvent = false;
    }
    onCustomWidgetBeforeUpdate(changedProperties) {console.log("onCustomWidgetBeforeUpdate")}
    onCustomWidgetAfterUpdate(changedProperties) {
      console.log("onCustomWidgetAfterUpdate")
      var shadow = this.shadowRoot;
      
      if ("data" in changedProperties) {
        this.$data = changedProperties["data"];
        this._selectionEvent = false;
      }
      /*let LoadLibsAfterUpdate = async function (host, data, props) {
        console.log("LoadLibsAfterUpdate")
        try {
          await host.loadScript("https://dagrejs.github.io/project/dagre-d3/latest/dagre-d3.min.js", shadow);
          await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
          await host.loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js",
            shadow
          );
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          host.drawGraph(data, props);
      }
      };
      if (!(this._init || this._selectionEvent)) {
        if (this._firstUpdate) {
          LoadLibsAfterUpdate(this, this.$data, this._props);
          this._firstUpdate = false;
        } else {
          this.drawGraph(this.$data, this._props);
        }

      }*/
      this.drawGraph(this.$data, this._props);
    }
    onCustomWidgetResize(width, height) {
      console.log("onCustomWidgetResize");
      var shadow = this.shadowRoot;
      this.$width = width + "px";
      this.$height = height + "px";
     /* let LoadLibsAfterResize = async function (host, data, props) {
        try {
          console.log("LoadLibsAfterUpdate")
          await host.loadScript("https://dagrejs.github.io/project/dagre-d3/latest/dagre-d3.min.js", shadow);
          await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
          await host.loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js",
            shadow
          );
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          host.drawGraph(data, props);
        }
      };
      if (this._firstResize) {
        LoadLibsAfterResize(this, this.$data, this._props);
        this._firstResize = false;
      } else {
        this.drawGraph(this.$data, this._props);
      }*/
      this.drawGraph(this.$data, this._props);
    }
    connectedCallback() {
      console.log("connectedCallback");
      var shadow = this.shadowRoot;
      var custelem = shadow.host;
      this.$width = custelem.parentNode.parentNode.parentNode.style.width;
      this.$height = custelem.parentNode.parentNode.parentNode.style.height;
      let LoadLibs = async function (host, data, props) {
        try {
          console.log("LoadLibsAfterUpdate")
          await host.loadScript("https://dagrejs.github.io/project/dagre-d3/latest/dagre-d3.min.js", shadow);
          await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
          await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
          await host.loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js",
            shadow
          );
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          host.drawGraph(data, props);
        }
      };
      LoadLibs(this, this.$data, this._props);
      this._init = false;
    }
    disconnectedCallback() {console.log("disconnectedCallback")}
    updateSelectedLabel(label) {
      console.log("updateSelectedLabel");
      if (label == "") this._props.selectedLabel = undefined;
      else this._props.selectedLabel = label;
    }
    drawGraph(value, config){
      console.log("drawGraph");
      var r = this.shadowRoot;
      var _div = r.querySelector("div");
      var width = _div.offsetWidth * 1
      var height = 1000 ;
      
      d3.select(r.querySelector("#dagreChart")).remove()
      //console.log("3")

      let dagreContainer = _div.appendChild(document.createElement("div"));
      dagreContainer.setAttribute("id", "dagreChart");
      dagreContainer.setAttribute("width", width);
      dagreContainer.setAttribute("height", height);

      //console.log("Try load of dagre charts")
      var g = new dagreD3.graphlib.Graph().setGraph({});

      // States and transitions from RFC 793
      var states = [ "CLOSED", "LISTEN", "SYN RCVD", "SYN SENT",
                    "ESTAB", "FINWAIT-1", "CLOSE WAIT", "FINWAIT-2",
                    "CLOSING", "LAST-ACK", "TIME WAIT" ];

      // Automatically label each of the nodes
      states.forEach(function(state) { g.setNode(state, { label: state }); });

      // Set up the edges
      g.setEdge("CLOSED",     "LISTEN",     { label: "open" });
      g.setEdge("LISTEN",     "SYN RCVD",   { label: "rcv SYN" });
      g.setEdge("LISTEN",     "SYN SENT",   { label: "send" });
      g.setEdge("LISTEN",     "CLOSED",     { label: "close" });
      g.setEdge("SYN RCVD",   "FINWAIT-1",  { label: "close" });
      g.setEdge("SYN RCVD",   "ESTAB",      { label: "rcv ACK of SYN" });
      g.setEdge("SYN SENT",   "SYN RCVD",   { label: "rcv SYN" });
      g.setEdge("SYN SENT",   "ESTAB",      { label: "rcv SYN, ACK" });
      g.setEdge("SYN SENT",   "CLOSED",     { label: "close" });
      g.setEdge("ESTAB",      "FINWAIT-1",  { label: "close" });
      g.setEdge("ESTAB",      "CLOSE WAIT", { label: "rcv FIN" });
      g.setEdge("FINWAIT-1",  "FINWAIT-2",  { label: "rcv ACK of FIN" });
      g.setEdge("FINWAIT-1",  "CLOSING",    { label: "rcv FIN" });
      g.setEdge("CLOSE WAIT", "LAST-ACK",   { label: "close" });
      g.setEdge("FINWAIT-2",  "TIME WAIT",  { label: "rcv FIN" });
      g.setEdge("CLOSING",    "TIME WAIT",  { label: "rcv ACK of FIN" });
      g.setEdge("LAST-ACK",   "CLOSED",     { label: "rcv ACK of FIN" });
      g.setEdge("TIME WAIT",  "CLOSED",     { label: "timeout=2MSL" });

      // Set some general styles
      g.nodes().forEach(function(v) {
        var node = g.node(v);
        node.rx = node.ry = 5;
      });

      // Add some custom colors based on state
      g.node('CLOSED').style = "fill: #f77";
      g.node('ESTAB').style = "fill: #7f7";

      var svg = d3.select(r.querySelector("#dagreChart")).append("svg");
      var inner = svg.append("g");
      var zoom = d3.zoom().on("zoom", function() {
            inner.attr("transform", d3.event.transform);
          });
      svg.call(zoom);
      var render = new dagreD3.render();
      //console.log("Dagre Rendered 14")
      
      render(inner, g);
  
      var initialScale = 0.75;
      svg.call(zoom.transform, d3.zoomIdentity.translate((width - g.graph().width * initialScale) / 2, 20).scale(initialScale));
      
      svg.attr('height', height);
      svg.attr('width', width);
      //svg.attr('height', g.graph().height * initialScale + 40);
    }
    
    loadScript(src, shadowRoot) {
      return new Promise(function (resolve, reject) {
        let script = document.createElement("script");
        script.src = src;
        script.onload = () => {
         // console.log("Load: " + src);
          resolve(script);
        };
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        shadowRoot.appendChild(script);
      });
    }
    d3ForceBubbleDefaultSettings() {
      return {
        leftMargin: 10,
        topMargin: 10,
        rightMargin: 10,
        bottomMargin: 10,
        legendMargin: 50,
        title: "Custom Force Bubble Widget",
        showTitle: true,
        showAvg: true,
        showSearch: true,
        startColor: "#ffcd00",
        endColor: "#b01c02",
        sizeDecimal: 2,
        colorDecimal: 2,
        valDecimal: 2,
        xAxisLabel: "Value",
        sizeLabel: "Size",
        colorLabel: "Color",
        selectedLabel: undefined,
        selectedXValue: undefined,
        selectedSizeValue: undefined,
        selectedColorValue: undefined,
        data: [],
      };
    }
   
  }
  customElements.define("com-gmail-cse-ari007-d3forcebubble", FBUBBLE);
})();
