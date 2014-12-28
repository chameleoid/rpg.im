app.factory('Map', ['Layer', function(Layer) {

  /**
   * Maps
   * @constructor
   * @memberof rim
   * @param {object} data
   * @param {number} data.width  Width of map
   * @param {number} data.height  Height of map
   * @param {array.<rim.Layer|object.<number,rim.Point|{x:number,y:number,type:string}>>} [data.layers]  Array of layer data
   */
  function Map(data) {
    var self = this;

    /**
     * Map layers
     * @type {array.<rim.Layer>}
     */
    this.layers = [];

    if (!data || !angular.isArray(data.layers)) {
      this.addLayer();
    } else {
      angular.forEach(data.layers, function(layer) {
        self.addLayer(layer);
      });
    }

    /**
     * Width of map
     * @private
     * @type {number}
     */
    this.width_ = 5;

    /**
     * Height of map
     * @private
     * @type {number}
     */
    this.height_ = 5;

    /**
     * Map ID
     * @private
     * @type {string}
     */
    this.id_ = '';
  }

  Map.prototype = {
    /**
     * @param {rim.Layer|object.<number,rim.Point|{x:number,y:number,type:string}>} [layer]  Hashmap of points
     * @return {number}  Returns index of new layer in {@link rim.Map#layers}
     * @memberof rim.Map.prototype
     */
    addLayer: function(layer) {
      if (angular.isUndefined(layer)) {
        layer = new Layer();
      }

      if (!(layer instanceof Layer)) {
        layer = new Layer(layer);
      }

      layer.map = this;
      return this.layers.push(layer);
    },

    /**
     * Width of the map
     * @readonly
     * @type {number}
     * @memberof rim.Map.prototype
     */
    get width() {
      return this.width_;
    },

    /**
     * Height of the map
     * @readonly
     * @type {number}
     * @memberof rim.Map.prototype
     */
    get height() {
      return this.height_;
    },

    /**
     * ID of map
     * @readonly
     * @type {string}
     * @memberof rim.Map.prototype
     */
    get id() {
      return this.id_;
    },

    /**
     * Converts an X/Y page coordinate to an X/Y map coordinate
     * @param {number} pageX  X coordinate on page
     * @param {number} pageY  Y coordinate on page
     * @return {{ x: number, y: number }}  Object containing x/y location
     * @memberof rim.Map.prototype
     */
    pageXYToXY: function(pageX, pageY, zoom) {
      return {
        x: Math.floor(x + pageX / zoom),
        y: Math.floor(y + pageY / zoom),
      };
    },

    /**
     * Converts an X/Y map coordinate to a point index
     * @param {number} x  X coordinate on map
     * @param {number} y  Y coordinate on map
     * @return {number}  Point index
     * @memberof rim.Map.prototype
     */
    xyToIndex: function(x, y) {
      return x + y * this.width;
    },

    /**
     * Converts an index to an X/Y map coordinate
     * @param {number} point  Point in array
     * @return {{ x: number, y: number }}  Object containing x/y location
     * @memberof rim.Map.prototype
     */
    indexToXY: function(index) {
      return {
        x: index % this.width,
        y: Math.trunc(index / this.height),
      };
    },

    /**
     * Prepares object for JSON stringification
     * @return {{height:number,width:number,layers:array.<rim.Layer>}}
     * @memberof rim.Map.prototype
     */
    toJSON: function() {
      return {
        height: this.height_,
        width: this.width_,
        layers: this.layers,
      };
    },
  };

  return Map;
}]);
