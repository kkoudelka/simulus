/* jshint */


class Model {

    /**
     * Create a new Model.
     */
    constructor() {

        /** @member {number} show only each n-th point, set to 1 to display every point */
        this.displayedPointRatio = 200;

        /** @member {number} current step number, initialized to 0 */
        this.stepCount = 0;

        /** @type {number} the time step duration */
        let dt = 0.0001;


        // Simulation declaration area - explicitly declare and initialize all variables here

        const g = 9.81;

        let l = 1;
        let alpha = 15 / 180 * Math.PI;

        let pendulum = {
            r: new Vector(l * Math.sin(alpha), l * Math.cos(alpha)),
            v: new Vector(0, 0),
            a: new Vector(0, 0),
            m: 1,
        };

        /*
        let a = -9.81;

        let x = 1;
        let y = 5;

        let v_x = 1.5;
        let v_y = 1;
        */
        // Declaration end


        /**
         * Advance model one step forward
         * @returns {boolean} False is returned, when simulation should not continue.
         */
        this.step = function () {
            let Fg = new Vector(0, pendulum.m * g);
            let FN = Fg.magnitude() * Math.cos(Math.atan(pendulum.r.x / pendulum.r.y));

            let Fs = Vector.multiply(-FN, pendulum.r.normalize());

            let FD = Vector.add(Fg, Fs);

            pendulum.a = Vector.multiply(1 / pendulum.m, FD);
            pendulum.v = Vector.add(pendulum.v, Vector.multiply(dt, pendulum.a));
            pendulum.r = Vector.add(pendulum.r, Vector.multiply(dt, pendulum.v));

            /*
            v_y += a * dt;
            x += v_x * dt;
            y += v_y * dt;

            if (y <= 0) return false; // stop condition
            */
            this.stepCount++; // Never delete this, used to calculate total time
            return true; // If next iteration allowed return true, if ended, return false
        };


        /**
         * Provides data for display - what should be displayed, when render is requested
         * @returns {(Array<Array<number>>|Array<number>)} Array of point coordinates for all datasets. If a single point given instead of Array, it will be considered as a next point for the first (the only) dataset
         */
        this.getCoordinates = function () {
            return [pendulum.r.x, pendulum.r.y];
            /*return [x, y]; // For a single dataset*/

            // return [ // for multiple dataset
            //   [earth.r.x, earth.r.y],
            //   [sun.r.x, sun.r.y]
            // ];
        };

        /**
         * @returns {object} Descriptions of watched variables
         */
        this.getVarDescriptions = function () {
            return {
                time: {name: "Time", unit: "s", precision: 2},
                x: {name: "x", unit: "m", precision: 2},
                y: {name: "y", unit: "m", precision: 2}
            };
        };

        /**
         * Called at each redraw
         * @returns {object} Watched variables values
         */
        this.getVars = function () {
            return {
                time: this.getTime(),
                x: pendulum.r.x,
                y: pendulum.r.y,
            };
            /*
            return {
                time: this.getTime(),
                x,
                y
            };*/
        };

        /**
         * Any actions performed at layout initialize (after constructor is called)
         */
        this.initialize = function () {
            // code to perform at layout initialize
        };

        /**
         * Returns current time of simulation
         * @returns {number} Time from simulation start
         */
        this.getTime = function () {
            return this.stepCount * dt;
        };

        /**
         * @returns {number} Time step value
         */
        this.getTimeStep = function () {
            return dt;
        };

    }


}
