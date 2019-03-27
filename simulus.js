/** The controller of the simulation process */
class Simulus {

    /**
     * @param {Model} model The model to be visualized 
     * @param {CanvasJS.Chart} chart the Chart object
     */
    constructor(model, chart) {
        /** @member {Model} The model object*/
        this.model = model;
        /** @member {CanvasJS.Chart} The chart object*/
        this.chart = chart;
        /** @member {Array<object>} Properties and nodes of watched variables*/
        this.monitors = {};

        this.model.initialize();
        this._oldModelPatch();
        this.createMonitors();

        chart.render(); 
    }

    /** 
     * Creates and remembers HTML nodes for watched variables display 
     * */
    createMonitors() {
        let $monitors = $("#variables");
        this.monitors = this.model.getVarDescriptions();
        for (let key in this.monitors) {
            let $node = $(`<tr class="display"><td class="varName">${this.monitors[key].name}</td><td class="varValue" id=${key}></td><td class="unit">${this.monitors[key].unit}</td></tr>`);
            $monitors.append($node);
            this.monitors[key].node = document.getElementById(key);
        }
    }

    /** 
     * Inserts text from model into watch nodes 
     * */
    displayVars() {
        let vars = this.model.getVars();
        for (let key in vars) {
            this.monitors[key].node.innerText = vars[key].toFixed(this.monitors[key].precision);
        }
    }   

    /** 
     * Asks model for data and renders into chart 
     * */
    render() {
        let data = this.model.getCoordinates();
        if (!Array.isArray(data)) return; //invalid data
        if (!Array.isArray(data[0])) // single dataset, boxing into array
            data = [data];

        for (let i = 0, l = data.length; i < l; i++) {
            this.chart.options.data[i].dataPoints.push({
                x: data[i][0],
                y: data[i][1]
            }); //add new points
            while (layout.historyLength > 0 && this.chart.options.data[i].dataPoints.length > layout.historyLength) //shorten point history, if required
                this.chart.options.data[i].dataPoints.shift();
        }
        this.chart.render();
    } 
    
    /** 
     * Used for injection method into old models without watched variable descriptions 
     */
    _oldModelPatch() {
        if (!this.model.getVarDescriptions || !this.model.getVars) {
            this.model.getVarDescriptions = function() {
                return {
                    time : {name: "Time", unit: "s", precision: 2}
                };
            };
        
            this.model.getVars = function() {
                return {
                    time : this.getTime()
                };
            };        
        }
    }

    /** 
     * Finds order of magnitude of the given number 
     * @param {number} num Number to analyze 
     * @returns {number} Order of magnitude
     * */
    static findPrecision (num) {
        var precision = -Math.floor(Math.log10(num)) + 1;
        return precision;
    }

}
