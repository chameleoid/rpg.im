app.factory('Point', function() {

  /**
   * Point on a {@link rim.Layer}
   * @constructor
   * @memberof rim
   * @param {object} options
   * @param {number} options.x  X coordinate
   * @param {number} options.y  Y coordinate
   * @param {string} options.type  Type of point
   */
  function Point(options) {
    /**
     * @private
     * @type {number}
     */
    this.x_ = options.x || 0;

    /**
     * @private
     * @type {number}
     */
    this.y_ = options.y || 0;

    /** @type {string} */
    this.type = options.type || 'wall';

    /**
     * Reference to map containing this point
     * @type {rim.Map}
     */
    this.map = options.map || null;

    /**
     * Reference to layer containing this point
     * @type {rim.Layer}
     */
    this.layer = options.layer || null;
  }

  Point.prototype = {
    /**
     * Get the point index by converting the point's x/y
     * @return {number|boolean}  Number if {@link Point#map} is set, false otherwise
     * @memberof rim.Point.prototype
     */
    getIndex: function() {
      if (!this.map) {
        return false;
      }

      return this.map.xyToIndex(this.x_, this.y_);
    },

    /**
     * X position of the point
     * @readonly
     * @type {number}
     * @memberof rim.Point.prototype
     */
    get x() {
      return this.x_;
    },

    /**
     * Y position of the point
     * @readonly
     * @type {number}
     * @memberof rim.Point.prototype
     */
    get y() {
      return this.y_;
    },

    /**
     * Prepares object for JSON stringification
     * @return {{type:string,x:number,y:number}}
     * @memberof rim.Point.prototype
     */
    toJSON: function() {
      return {
        type: this.type,
        x: this.x_,
        y: this.y_,
      };
    },
  };

  return Point;
});
