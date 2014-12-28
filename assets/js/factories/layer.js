app.factory('Layer', ['Point', function(Point) {

  /**
   * Layer in a {@link rim.Map}
   * @constructor
   * @memberof rim
   * @param {object.<number,rim.Point|{x:number,y:number,type:string}>} [data]  Hashmap of points
   */
  function Layer(data) {
    /**
     * Reference to map containing this point
     * @type {rim.Map}
     */
    this.map = null;

    /**
     * Hashmap of points
     * @type {object.<number,rim.Point>}
     */
    this.data = data || {};
  }

  Layer.prototype = {
    /**
     * Add a point to the layer
     * @param {{x:number,y:number}|rim.Point} point
     * @return {rim.Point|boolean}  Returns a {@link rim.Point} on valid input,
     * false otherwise
     * @memberof rim.Layer.prototype
     */
    addPoint: function(point) {
      if (angular.isUndefined(point)) {
        return false;
      }

      if (!(point instanceof Point)) {
        point = new Point(point);
      }

      point.map = this.map;
      point.layer = this;
      this.data[point.getIndex()] = point;

      return point;
    },

    /**
     * Remove a point from the layer
     * @param {{x:number,y:number|rim.Point|number} point
     * @return {boolean}  True if removed, false otherwise
     * @memberof rim.Layer.prototype
     */
    removePoint: function(point) {
      var point_ = this.getPoint(point);

      if (point_) {
        delete this.data[point_.getIndex()];
      }

      return !!point_;
    },

    /**
     * Attempt to get a point from a given location
     * @param {{x:number,y:number|rim.Point|number} point
     * @return {rim.Point|boolean} point  Returns {@link rim.Point} if found,
     * false otherwise
     * @memberof rim.Layer.prototype
     */
    getPoint: function(point) {
      var point_;

      if (angular.isNumber(point.x) && angular.isNumber(point.y)) {
        point_ = this.map.xyToIndex(point.x, point.y);
      } else if (angular.isNumber(point)) {
        point_ = point;
      }

      return this.data[point_] || false;
    },

    /**
     * Prepares object for JSON stringification
     * @return {{data:object.<number,rim.Point>}}
     * @memberof rim.Layer.prototype
     */
    toJSON: function() {
      return {
        data: this.data,
      };
    },
  };

  return Layer;
}]);
