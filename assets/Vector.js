class Vector {

    /**
     * Create a vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add two vectors together.
     * @param {Vector} u - first vector to be added.
     * @param {Vector} v - second vector to be added.
     * @returns {Vector} a new Vector object compound from u and v.
     */
    static add(u, v) {
        return new Vector(
            u.x + v.x,
            u.y + v.y
        );
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {number} a - scalar factor
     * @param {Vector} u - vector to be multiplies
     * @returns {Vector} a new Vector object a�u.
     */
    static multiply(a, u) {
        return new Vector(
            a * u.x,
            a * u.y
        );
    }

    /**
     * Subtracts two vectors
     * @param {Vector} u - first vector
     * @param {Vector} v - second vector to be subtracted from first
     * @returns {Vector} a new Vector object u - v
     */
    static subtract(u, v) {
        return Vector.add(u, Vector.multiply(-1, v));
    }

    /**
     * Calculates scalar product
     * @param {Vector} u - first vector
     * @param {Vector} v - second vector
     * @returns {number} the scalar product
     */
    static scalar(u, v) {
        return u.x * v.x + u.y * v.y;
    }

    /**
     * Calculates vector magnitude
     * @returns {number} the vector magnitude
     */
    magnitude() {
        return Math.sqrt(Vector.scalar(this, this));
    }


    /**
     * Calculates normalized vector
     * @returns {Vector} the normalized vector
     */
    normalize() {
        return Vector.multiply(1 / this.magnitude(), this);
    }

    /** Turn vector
     *  @returns {Vector} new vector turned by 90 degrees CCW
     */
    turn90() {
        return new Vector(
            -this.y,
            this.x
        );
    }

}