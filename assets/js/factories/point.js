app.factory('Point', function() {

  /**
   * Point on a {@link rim.Layer}
   * @constructor
   * @memberof rim
   * @param {object} data
   * @param {number} data.x  X coordinate
   * @param {number} data.y  Y coordinate
   * @param {string} data.type  Type of point
   */
  function Point(data) {
    /**
     * @private
     * @type {number}
     */
    this.x_ = data.x || 0;

    /**
     * @private
     * @type {number}
     */
    this.y_ = data.y || 0;

    /** @type {string} */
    this.type = data.type || 'wall';

    /**
     * Reference to map containing this point
     * @type {rim.Map}
     */
    this.map = null;

    /**
     * Reference to layer containing this point
     * @type {rim.Layer}
     */
    this.layer = null;
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

  /**
   * Creates a point from index
   * @param {number} index  Index of point
   * @param {number} width  Width of containing map
   * @return {rim.Point}
   * @memberof rim.Point
   */
  Point.fromIndex = function(index, width) {
    return new Point({
      x: x,
      y: y,
    });
  };

  return Point;
});
